import z from 'zod'

export const zUpdateProfileTrpcInput = z.object({
  nick: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dushes'),
  name: z.string().max(30).default(''),
})
