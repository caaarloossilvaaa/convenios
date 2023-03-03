import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/authenticate";
import { z } from "zod";

export async function sellersRoutes(fastify:FastifyInstance) {
  fastify.get("/api/sellers", async (request, reply) => {
    const sellers = await fastify.prisma.seller.findMany({})
    return { sellers }
  })
  fastify.get("/api/seller/:id", { onRequest: authenticate }, async (request, reply) => {
    const getSellerParams = z.object({
      id: z.string()
    })
    const { id } = getSellerParams.parse(request.params)
    const seller = await fastify.prisma.seller.findFirst({
      where: { id }
    })
    return { seller }
  })
  fastify.get("/api/sellers/:name", { onRequest: authenticate }, async (request, reply) => {
    const getSellerParams = z.object({
      name: z.string()
    })
    const { name } = getSellerParams.parse(request.params)
    const sellers = await fastify.prisma.seller.findMany({
      where: { 
        name: {
          contains: name
        }
      }
    })
    return { sellers }
  })
  fastify.post("/api/sellers", { onRequest: authenticate }, async (request, reply) => {
    const getSellerParams = z.object({
      name: z.string(),
      cpf: z.string(),
      phone: z.string(),
      cell: z.string()
    })
    const { name, cpf, phone, cell } = getSellerParams.parse(request.body)
    const seller = await fastify.prisma.seller.create({
      data: {
        name, 
        cpf,
        phone,
        cell
      }
    })
    return { seller }
  })
  fastify.delete("/api/seller/:id", { onRequest: authenticate }, async (request, reply) => {
    const getSellerParams = z.object({
      id: z.string()
    })
    const { id } = getSellerParams.parse(request.params)
    const seller = await fastify.prisma.seller.delete({
      where: { id }
    })
    return { seller }
  })
}