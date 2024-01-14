import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRepository from './repository'
import * as schema from './schema'
import * as movieSchema from '../movies/schema'

export default (db: Database) => {
  const router = Router()
  const messages = buildRepository(db)

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
      const movieId = movieSchema.parseId(req.params.movieId)

      const screenings = await messages.findById(movieId)

      return screenings
    })
  )

  router.post(
    '/',
    jsonRoute(async (req) => {
      const body = schema.parseInsertable(req.body)

      return messages.createScreening(body)
    }, StatusCodes.CREATED)
  )

  return router
}
