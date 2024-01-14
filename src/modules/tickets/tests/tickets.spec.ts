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

describe('GET', async () => {
  await createMovies(fixtures.movies)
  await createScreenings(fixtures.screenings)

  it('should return all tickets', async () => {
    await createTickets(fixtures.tickets)

    const { body } = await supertest(app).get('/tickets').expect(200)

    expect(body).toHaveLength(2)
    expect(body).toEqual([
      {
        id: 1,
        screeningId: 1,
      },
      {
        id: 2,
        screeningId: 2,
      },
    ])
  })
})

describe('POST', async () => {
  beforeEach(async () => {
    await db.deleteFrom('ticket').execute()
  })

  it('should add a new ticket to database', async () => {
    await supertest(app)
      .post('/tickets')
      .send({
        screeningId: 1,
      })
      .expect(201, [
        {
          id: 3,
        },
      ])
  })

  it('persists created ticket', async () => {
    await supertest(app).post('/tickets').send({
      screeningId: 1,
    })

    await supertest(app)
      .get('/tickets')
      .expect(200, [
        {
          id: 4,
          screeningId: 1,
        },
      ])
  })

  it('should add multiple tickets', async () => {
    await supertest(app)
      .post('/tickets')
      .send([{ screeningId: 1 }, { screeningId: 2 }])
      .expect(201, [
        {
          id: 5,
        },
        {
          id: 6,
        },
      ])
  })
})
