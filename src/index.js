import process from 'node:process'
import http from 'node:http'
import util from 'node:util'

const { PORT = '3000' } = process.env
const port = Number.parseInt(PORT, 10)

const server = http
  .createServer((req, res) => res.end('ok'))
  .listen(port)
  .on('listening', () => console.log(`Server listening on port ${port}`))

const closeServer = util.promisify(server.close.bind(server))

async function stop () {
  const closeServerPromise = closeServer
  server.closeIdleConnections()
  server.closeAllConnections()
  await closeServerPromise()
}

let called = false
function shutdown () {
  if (called) return
  called = true
  stop()
    .then(() => process.exit())
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}
process.once('SIGINT', shutdown)
process.once('SIGTERM', shutdown)
process.once('SIGUSR2', shutdown)
