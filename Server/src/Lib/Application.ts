import express, { Request, Response, NextFunction } from 'express'
import { IApplicationConfig, IDatabase } from './Types'

export interface IUseOptions {
  json: boolean
}

export abstract class Application {
  static PORT: number = Number(process.env.PORT) || 5000

  protected server: express.Application
  protected database: IDatabase | undefined

  private useJson: boolean

  constructor(config: IApplicationConfig) {
    this.server = config.server
    this.database = config.database
    this.useJson = config.useJson || false

    this.preBoot()
    this.boot()
  }

  public async boot() {
    this.handleExceptions()

    if (process.env.NODE_ENV !== 'test') {
      this.server.listen(Application.PORT, this.onSuccessBoot.bind(this))
    }
  }

  protected onSuccessBoot() {
    console.log(`Server is running on: http://localhost:5000/`)
  }

  protected handleExceptions() {
    this.server.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        const { statusCode = 500, message = 'Something went wrong...' } = err

        res.status(statusCode).json({
          statusCode,
          message,
          data: null,
          error: true,
        })
      }
    )
  }

  protected async connectDatabase() {
    await this.database?.connect()
  }

  private preBoot() {
    if (this.useJson) this.server.use(express.json())
  }
}
