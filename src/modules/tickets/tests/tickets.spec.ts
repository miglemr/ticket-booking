import { afterEach } from 'vitest'
import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import createApp from '@/app'
import * as fixtures from './fixtures'

const db = await createTestDatabase()
const app = createApp(db)

const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screening')
const createTickets = createFor(db, 'ticket')

describe('POST', async () => {
  afterEach(async () => {
    await db.deleteFrom('ticket').execute()
  })

  it.skip('should add a new ticket to database', async () => {
    await createMovies(fixtures.movies)
    await createScreenings(fixtures.screenings)

    await supertest(app)
      .post('/tickets')
      .send({
        screeningId: 1,
      })
      .expect(201, {
        id: 1,
      })
  })

  it.skip('should add specified number of tickets for a screening', async () => {
    await createMovies(fixtures.movies)
    await createScreenings(fixtures.screenings)

    await supertest(app)
      .post('/tickets')
      .send({
        screeningId: 1,
        quantity: 2,
      })
      .expect(201, [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ])
  })
})

describe('GET', () => {
  it('should return all tickets', async () => {
    await createTickets(fixtures.tickets)

    const tickets = await supertest(app).get('/tickets').expect(200)

    expect(tickets).toHaveLength(2)
    expect(tickets).toEqual([
      {
        id: expect.any(Number),
        screeningId: 1,
      },
      {
        id: expect.any(Number),
        screeningId: 2,
      },
    ])
  })
})
