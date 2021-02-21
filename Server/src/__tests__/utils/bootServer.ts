import { app } from '../../Bootstrap'

/**
 * Utility function to make sure you can run multiple tests with Express. It also
 * deals with the race-condition which TypeOrm causes.
 */
export function bootServer(isRunning: boolean, delay: number = 500) {
  // @ts-expect-error
  app.server.listen(undefined, () => {
    setTimeout(() => {
      // @ts-expect-error
      app.server.emit('server-booted')
      isRunning = true
    }, delay)
  })
}
