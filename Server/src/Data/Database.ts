import { IDatabase } from '../Lib/Types'
import { createConnection, getConnectionOptions } from 'typeorm'

export class Database implements IDatabase {
  async connect() {
    const options = await getConnectionOptions(process.env.NODE_ENV)
    const optionsWithDefaultName = { ...options, name: 'default' }

    await createConnection(optionsWithDefaultName)

    if (process.env.NODE_ENV !== 'test') {
      this.onConnection()
    }
  }

  private onConnection() {
    console.log('Connected to database.')
  }
}
