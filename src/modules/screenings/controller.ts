import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRepository from './repository'

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
      const movieId = parseInt(req.params.movieId, 10)

      const screenings = await messages.findById(movieId)

      return screenings
    })
  )

  return router
}
