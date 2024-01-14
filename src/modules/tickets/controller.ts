import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRepository from './repository'

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
      const ticketIds = await messages.createBooking(req.body)

      return ticketIds
    }, StatusCodes.CREATED)
  )

  return router
}
