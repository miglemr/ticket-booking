import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'

export default (db: Database) => {
  const router = Router()

  router.post(
    '/',
    jsonRoute(async () => {})
  )

  return router
}
