import { z } from 'zod'

const schema = z.object({
  id: z.coerce.number().int().positive(),
  timestamp: z.string().datetime(),
  ticketsTotal: z.number().int().positive(),
  movieId: z.number().int().positive(),
})

const insertable = schema.omit({
  id: true,
})

export const parseId = (id: unknown) => schema.shape.id.parse(id)
export const parseInsertable = (record: unknown) => insertable.parse(record)
