import express from 'express'

export interface IApplicationConfig {
  server: express.Application
  database?: IDatabase
  useJson?: boolean
}

export interface IDatabase<T = void> {
  connect: () => Promise<T>
}
