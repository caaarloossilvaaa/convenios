import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/authenticate";
import { z } from "zod";

export async function companiesRoutes(fastify:FastifyInstance) {
  fastify.get("/api/companies", { onRequest: authenticate }, async (request, reply) => {
    const companies = await fastify.prisma.company.findMany({})
    return { companies }
  })
  fastify.get("/api/company/:id", { onRequest: authenticate }, async (request, reply) => {
    const getCompanyParams = z.object({
      id: z.string()
    })
    const { id } = getCompanyParams.parse(request.params)
    const company = await fastify.prisma.company.findFirst({
      where: {
        id
      }
    })
    return { company }
  })
  fastify.get("/api/companies/:name", { onRequest: authenticate }, async (request, reply) => {
    const getCompanyParams = z.object({
      name: z.string()
    })
    const { name } = getCompanyParams.parse(request.params)
    const companies = await fastify.prisma.company.findMany({
      where: {
        name: {
          contains: name
        }
      }
    })
    return { companies }
  })
  fastify.post("/api/companies", { onRequest: authenticate },async (request, reply) => {
    const getCompanyParams = z.object({
      name: z.string(),
      cnpj: z.string(),
      city: z.string(),
      phone: z.string(),
      cell: z.string()
    })
    const { name, cnpj, city, phone, cell } = getCompanyParams.parse(request.body)
    const company = await fastify.prisma.company.create({
      data: {
        name,
        cnpj,
        city,
        phone,
        cell
      }
    })
    return { company }
  })
  fastify.delete("/api/company/:id", { onRequest: authenticate }, async (request, reply) => {
    const getCompanyParams = z.object({
      id: z.string()
    })
    const { id } = getCompanyParams.parse(request.params)
    const company = await fastify.prisma.company.delete({
      where: {
        id
      }
    })

    return { company }
  })
}