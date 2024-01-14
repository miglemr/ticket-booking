import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRepository from './repository'
import * as schema from './schema'

export default (db: Database) => {
  const router = Router()
  const messages = buildRepository(db)

  router.get(
    '/',
    jsonRoute(async () => {
      const tickets = await messages.findAll()

      return tickets
    })
  )

  router.post(
    '/',
    jsonRoute(async (req) => {
      if (Array.isArray(req.body)) {
        const body = req.body.map((el) => schema.parseInsertable(el))

        return messages.createBooking(body)
      }

      const body = schema.parseInsertable(req.body)

      return messages.createBooking(body)
    }, StatusCodes.CREATED)
  )

  return router
}
