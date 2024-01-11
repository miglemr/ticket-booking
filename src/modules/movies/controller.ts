import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRespository from './repository'
import * as schema from './schema'

export default (db: Database) => {
  const messages = buildRespository(db)
  const router = Router()

  router.get(
    '/',
    jsonRoute(async (req) => {
      const ids = req.query.id

      if (typeof ids !== 'string') {
        const movies = await messages.findAll()
        return movies
      }

      const idArr = ids?.split(',').map((id) => schema.parseId(id))

      const movies = await messages.findByIds(idArr)

      return movies
    })
  )

  return router
}
