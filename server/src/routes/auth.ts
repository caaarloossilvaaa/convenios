import { FastifyInstance } from "fastify"
import { authenticate } from "../plugins/authenticate"
import { z } from "zod"
import { compare, hash } from "bcrypt"

export async function authRoutes(fastify:FastifyInstance) {
  fastify.get("/api/me", { onRequest: [authenticate] }, async (request) => {
    return { user: request.user }
  })
  fastify.post("/api/login", async (request, reply) => {
    const getLoginParams = z.object({
      email: z.string().email(),
      password: z.string()
    })
    const { email, password } = getLoginParams.parse(request.body)

    const user = await fastify.prisma.user.findUnique({
      where: {
        email
      }
    })

    if(!user) {
      return { message: 'Email/senha incorretos' }
    }

    const verifyPassword = await compare(password, user.password)
    if(!verifyPassword) {
      return { message: 'Email/senha incorretos' }
    }

    const token = fastify.jwt.sign({
      name: user.name,
      email: user.email
    }, {
      sub: user.id,
      expiresIn: '7 days'
    })

    const { id, name } = user
    const userReturn = { id, name, email }

    return { token, user: userReturn }
  })
  fastify.post("/api/signup",async (request, reply) => {
    const getSignUpParams = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string()
    })
    const { name, email, password } = getSignUpParams.parse(request.body)

    const userExists = await fastify.prisma.user.findUnique({
      where: {
        email
      }
    })
    if(userExists) {
      return { message: 'Usuário já cadastrado' }
    }

    const passwordHash = await hash(password, 10)

    const user = await fastify.prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return { user }
  })
}