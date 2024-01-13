import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRepository from './repository'
import * as schema from './schema'

export default (db: Database) => {
  const messages = buildRepository(db)
  const router = Router()

  router.get(
    '/',
    jsonRoute(async () => {
      const screenings = await messages.findAll()

      return screenings
    })
  )

  router.get(
    '/:movieId',
    jsonRoute(async (req) => {
      const movieId = schema.parseId(req.params.movieId)

      const screenings = await messages.findById(movieId)

      return screenings
    })
  )

  router.post(
    '/',
    jsonRoute(async () => {})
  )

  return router
}
