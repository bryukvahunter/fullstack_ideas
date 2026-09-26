import { PrismaClient } from '@prisma/client'

export function createAppContext() {
  const prisma = new PrismaClient()

  return {
    prisma,
    stop: async () => {
      await prisma.$disconnect()
    },
  }
}

export type AppContex = ReturnType<typeof createAppContext>
