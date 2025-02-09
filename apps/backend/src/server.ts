import app from "./app"
import { env } from "./env"

const PORT = env.PORT || 3000
const HOST = env.HOST || "localhost"

app.listen({ port: PORT, host: HOST }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`Server running at ${address}`)
})
