import 'dotenv/config'
import 'reflect-metadata'

import express from 'express'

import { App } from './App'
import { Database } from './Data/Database'

const server = express()
const database = new Database()

export const app = new App({
  server,
  database,
  useJson: true,
})
