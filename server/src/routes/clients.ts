import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/authenticate";
import { z } from "zod";

export async function clientsRoutes(fastify:FastifyInstance) {
  fastify.get("/api/clients", async (request, reply) => {
    const clients = await fastify.prisma.client.findMany({
      include: {
        Balance: true,
        company: true
      }
    })
    return { clients }
  })
  fastify.get("/api/client/:id", { onRequest: authenticate }, async (request, reply) => {
    const getClientParams = z.object({
      id: z.string()
    })
    const { id } = getClientParams.parse(request.params)
    const client = await fastify.prisma.client.findFirst({
      where: {
        id
      },
      include: {
        Balance: true
      }
    })
    return { client }
  })
  fastify.get("/api/clients/:name", { onRequest: authenticate }, async (request, reply) => {
    const getClientParams = z.object({
      name: z.string()
    })
    const { name } = getClientParams.parse(request.params)
    const clients = await fastify.prisma.client.findMany({
      where: {
        name: {
          contains: name
        }
      },
      include: {
        Balance: true
      }
    })
    return { clients }
  })
  fastify.post("/api/clients", { onRequest: authenticate }, async (request, reply) => {
    const getClientParams = z.object({
      name: z.string(),
      cpf: z.string(),
      phone: z.string(),
      cell: z.string(),
      companyId: z.string(),
      zip: z.string(),
      address: z.string(),
      number: z.string(),
      complement: z.string(),
      district: z.string(),
      city: z.string(),
      state: z.string(),
      totalBalance: z.number()
    })
    const { name, cpf, phone, cell, companyId, zip, address, number, complement, district, city, state, totalBalance } = getClientParams.parse(request.body)

    const client = await fastify.prisma.client.create({
      data: {
        name, 
        cpf, 
        phone, 
        cell, 
        companyId,
        zip, 
        address, 
        number, 
        complement, 
        district, 
        city, 
        state,
      }
    })

    const balance = await fastify.prisma.balance.create({
      data: {
        clientId: client.id,
        balance: 0,
        totalBalance,
      }
    })

    return { client, balance }
  })
  fastify.delete("/api/client/:id", { onRequest: authenticate }, async (request, reply) => {
    const getClientParams = z.object({
      id: z.string()
    })
    const { id } = getClientParams.parse(request.params)
    const client = await fastify.prisma.client.delete({
      where: {
        id
      }
    })
    return { client }
  })
}