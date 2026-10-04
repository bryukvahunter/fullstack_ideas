import z from 'zod'
import { zCreateIdeaTrpcInput } from '../create-idea/input'

export const zUpdateIdeaTrpcInput = zCreateIdeaTrpcInput.extend({
  ideaId: z.string().min(1),
})
