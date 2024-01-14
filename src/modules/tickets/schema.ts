import { z } from 'zod'

const schema = z.object({
  id: z.number().int().positive(),
  screeningId: z.number().int().positive(),
})

const insertable = schema.omit({
  id: true,
})

export const parseInsertable = (record: unknown) => insertable.parse(record)
