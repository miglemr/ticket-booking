import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import createApp from '@/app'
import * as fixtures from './fixtures'

const db = await createTestDatabase()
const app = createApp(db)

const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screening')

describe('POST', async () => {
  await createMovies(fixtures.movies)
  await createScreenings(fixtures.screenings)

  it('should add a new ticket to database', async () => {
    const ticket = await supertest(app)
      .post('/tickets')
      .send({
        screeningId: 1,
      })
      .expect(201, {
        id: expect.any(Number),
      })
  })
})
