import express from 'express'
import movies from '@/modules/movies/controller'
import screenings from '@/modules/screenings/controller'
import jsonErrorHandler from './middleware/jsonErrors'
import { type Database } from './database'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function createApp(db: Database) {
  const app = express()

  app.use(express.json())

  // register your controllers here
  app.use('/movies', movies(db))
  app.use('/screenings', screenings(db))

  app.use(jsonErrorHandler)

  return app
}
