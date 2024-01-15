import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import * as fixtures from './fixtures'
import createApp from '@/app'

const db = await createTestDatabase()
const app = createApp(db)

const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screening')

await createMovies(fixtures.movies)
await createScreenings(fixtures.screenings)

describe('GET', async () => {
  it('should return all screenings with movie title and year', async () => {
    const { body } = await supertest(app).get('/screenings').expect(200)

    expect(body).toHaveLength(3)
    expect(body).toEqual([
      {
        id: expect.any(Number),
        timestamp: '2024-01-20T10:00:00Z',
        ticketsTotal: 20,
        ticketsLeft: 20,
        title: 'The Dark Knight',
        year: 2008,
      },
      {
        id: expect.any(Number),
        timestamp: '2024-01-22T15:00:00Z',
        ticketsTotal: 30,
        ticketsLeft: 30,
        title: 'The Dark Knight',
        year: 2008,
      },
      {
        id: expect.any(Number),
        timestamp: '2024-01-21T22:00:00Z',
        ticketsTotal: 20,
        ticketsLeft: 20,
        title: 'Sherlock Holmes',
        year: 2009,
      },
    ])
  })

  it('should return all screenings for provided movie id', async () => {
    const { body } = await supertest(app).get('/screenings/22').expect(200)

    expect(body).toHaveLength(2)
    expect(body).toEqual([
      {
        id: expect.any(Number),
        timestamp: '2024-01-20T10:00:00Z',
        ticketsTotal: 20,
        ticketsLeft: 20,
        title: 'The Dark Knight',
        year: 2008,
      },
      {
        id: expect.any(Number),
        timestamp: '2024-01-22T15:00:00Z',
        ticketsTotal: 30,
        ticketsLeft: 30,
        title: 'The Dark Knight',
        year: 2008,
      },
    ])
  })
})

describe('POST', () => {
  afterEach(async () => {
    await db.deleteFrom('screening').execute()
  })

  it('should create new screening in database', async () => {
    const { body } = await supertest(app)
      .post('/screenings')
      .send({
        timestamp: '2024-01-25T14:30:00Z',
        ticketsTotal: 20,
        movieId: 22,
      })
      .expect(201)

    expect(body).toEqual({
      id: expect.any(Number),
    })
  })

  it('should not create a new screening if movie ID is invalid', async () => {
    await supertest(app)
      .post('/screenings')
      .send({
        timestamp: '2024-01-27T21:30:00Z',
        ticketsTotal: 20,
        movieId: 9999,
      })
      .expect(500)
  })
})
