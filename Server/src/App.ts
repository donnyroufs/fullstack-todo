import { Application } from './Lib/Application'

export class App extends Application {
  public API_VERSION = 1

  async boot() {
    await this.connectDatabase()
    await this.registerApiRoutes()

    await super.boot()
  }

  private async registerApiRoutes() {
    const { default: apiRoutes } = await import('./Routes')
    this.server.use(`/api/v${this.API_VERSION}`, apiRoutes)
  }
}
