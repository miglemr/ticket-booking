import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRespository from './repository'

export default (db: Database) => {
  const messages = buildRespository(db)
  const router = Router()

  router.get(
    '/',
    jsonRoute(async (req) => {
      const { id } = req.query

      if (typeof id !== 'string') {
        const movies = await messages.findAll()
        return movies
      }

      const idArr = id?.split(',').map(Number)

      const movies = await messages.findByIds(idArr)

      return movies
    })
  )

  return router
}
