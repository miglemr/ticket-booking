import { z } from 'zod'

const schema = z.object({
  id: z.coerce.number().int().positive(),
  timestamp: z.string().datetime(),
  ticketsTotal: z.number().int().positive(),
  ticketsLeft: z.number().int().nonnegative(),
  movieId: z.number().int().positive(),
})

const insertable = schema.omit({
  id: true,
  ticketsLeft: true,
})

export const parseId = (id: unknown) => schema.shape.id.parse(id)
export const parseInsertable = (record: unknown) => insertable.parse(record)
