import { z } from 'zod'

const schema = z.object({
  id: z.coerce.number().int().positive(),
  date: z.string().datetime(),
  ticketsTotal: z.number().int().positive(),
  movieId: z.number().int().positive(),
})

export const parseId = (id: unknown) => schema.shape.id.parse(id)
