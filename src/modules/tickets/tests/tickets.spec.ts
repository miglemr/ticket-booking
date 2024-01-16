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

await createMovies(fixtures.movies)
await createScreenings(fixtures.screenings)
await createTickets(fixtures.tickets)

describe('GET', async () => {
  it('should return all tickets', async () => {
    const { body } = await supertest(app).get('/tickets').expect(200)

    expect(body).toHaveLength(2)
    expect(body).toEqual([
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

describe('POST', async () => {
  beforeEach(async () => {
    await db.deleteFrom('ticket').execute()
  })

  it('should add a new ticket to database', async () => {
    const { body } = await supertest(app)
      .post('/tickets')
      .send({
        screeningId: 1,
      })
      .expect(201)

    expect(body).toEqual([
      {
        id: expect.any(Number),
      },
    ])
  })

  it('persists created ticket', async () => {
    await supertest(app).post('/tickets').send({
      screeningId: 1,
    })

    const { body } = await supertest(app).get('/tickets').expect(200)

    expect(body).toEqual([
      {
        id: expect.any(Number),
        screeningId: 1,
      },
    ])
  })

  it('should add multiple tickets', async () => {
    const { body } = await supertest(app)
      .post('/tickets')
      .send([{ screeningId: 1 }, { screeningId: 2 }])
      .expect(201)

    expect(body).toEqual([
      {
        id: expect.any(Number),
      },
      {
        id: expect.any(Number),
      },
    ])
  })

  it('should decrement tickets left column value by one', async () => {
    await db.deleteFrom('screening').execute()
    await createScreenings(fixtures.screenings)

    await supertest(app)
      .post('/tickets')
      .send([{ screeningId: 4 }, { screeningId: 5 }])

    const { body } = await supertest(app).get('/screenings').expect(200)

    expect(body[0]).toEqual({
      id: expect.any(Number),
      timestamp: '2024-01-20T10:00:00Z',
      ticketsTotal: 20,
      ticketsLeft: 19,
      title: 'The Dark Knight',
      year: 2008,
    })

    expect(body[1]).toEqual({
      id: expect.any(Number),
      timestamp: '2024-01-22T15:00:00Z',
      ticketsTotal: 30,
      ticketsLeft: 29,
      title: 'The Dark Knight',
      year: 2008,
    })
  })

  it('should throw an error if there are no tickets left', async () => {
    await supertest(app).post('/screenings').send({
      timestamp: '2024-01-30T21:00:00Z',
      ticketsTotal: 1,
      movieId: 22,
    })

    await supertest(app).post('/tickets').send({ screeningId: 7 })
    await supertest(app).post('/tickets').send({ screeningId: 7 }).expect(400)
  })
})
