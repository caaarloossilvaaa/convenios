import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/authenticate";
import { z } from "zod";

export async function saleRoutes(fastify:FastifyInstance) {
  fastify.get("/api/sales", async (request, reply) => {
    const sales = await fastify.prisma.sale.findMany({
      include: {
        client: {
          include: {
            company: true
          }
        },
        seller: true,
      }
    })
    return { sales }
  })
  fastify.post("/api/sales", async (request, reply) => {
    const getSaleParams = z.object({
      clientId: z.string(),
      sellerId: z.string(),
      value: z.number()
    })
    const { clientId, sellerId, value } = getSaleParams.parse(request.body)
    const client = await fastify.prisma.balance.findUnique({
      where: {
        clientId,
      }
    })

    const newBalance = (Number(client?.balance) + value)

    if(newBalance > Number(client?.totalBalance)) {
      return { message: "Saldo insuficiente" }
    }

    const sale = await fastify.prisma.sale.create({
      data: {
        clientId,
        sellerId,
        value,
      },
      include: {
        client: true
      }
    })

    const balance = await fastify.prisma.balance.update({
      where: {
        clientId,
      }, 
      data: {
        balance: newBalance
      }
    })

    return { sale, balance }
  })
  fastify.delete("/api/sales/:id", async (request, reply) => {
    const getSaleParams = z.object({
      id: z.string(),
    })
    const { id } = getSaleParams.parse(request.params)
    const sale = await fastify.prisma.sale.findUnique({
      where: {
        id,
      },
      include: {
        client: true
      }
    })

    if (sale === null) {
      return { message: 'Venda inexistente' }
    }

    const balance = await fastify.prisma.balance.findUnique({
      where: {
        clientId: sale?.clientId
      },
      include: {
        client: true
      }
    })

    let balanceOld = Number(balance?.balance)
    let valueSale = Number(sale?.value)
    let balanceId = String(balance?.id)

    const newBalance = balanceOld - valueSale

    const updateBalance = await fastify.prisma.balance.update({
      where: {
        id: balanceId
      },
      data: {
        balance: newBalance
      }
    })
    const removeSale = await fastify.prisma.sale.delete({
      where: {
        id
      }
    })

    return { removeSale, updateBalance }
  })
}