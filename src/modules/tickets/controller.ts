import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRepository from './repository'

export default (db: Database) => {
  const router = Router()
  const messages = buildRepository(db)

  router.post(
    '/',
    jsonRoute(async (req) => {
      const ticketId = await messages.createBooking(req.body)
      return ticketId
    }, StatusCodes.CREATED)
  )

  return router
}
