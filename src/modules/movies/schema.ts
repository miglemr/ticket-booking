import { z } from 'zod'

const schema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string().min(1).max(500),
  year: z.number().int().positive(),
})

export const parseId = (id: unknown) => schema.shape.id.parse(id)
