import 'dotenv/config'

import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import prismaPlugin from './plugins/prisma'

import { clientsRoutes } from './routes/clients'
import { companiesRoutes } from './routes/companies'
import { sellersRoutes } from './routes/sellers'
import { authRoutes } from './routes/auth'
import { saleRoutes } from './routes/sales'

const PORT = Number(process.env.PORT) || 3333
const SECRET = String(process.env.JWT_SECRET) || ''

async function bootstrap() {
  const app = Fastify({ logger: true})
  
  await app.register(fastifyCors)
  await app.register(prismaPlugin)
  await app.register(fastifyJwt, { secret: SECRET })

  await app.register(clientsRoutes)
  await app.register(companiesRoutes)
  await app.register(sellersRoutes)
  await app.register(authRoutes)
  await app.register(saleRoutes)

  app.get("/api", (request, reply) => {
    return { message: 'Api OK' }
  })
  
  app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if(err){
      app.log.error(err)
      process.exit(1)
    }
    app.log.info(`Server listening on ${address}`)
  })
}

bootstrap()
