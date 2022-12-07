import process from 'node:process'
import http from 'node:http'

const { PORT = '3000' } = process.env
const port = Number.parseInt(PORT, 10)

http
  .createServer((req, res) => res.end('ok'))
  .listen(port)
  .on('listening', () => console.log(`Server listening on port ${port}`))
