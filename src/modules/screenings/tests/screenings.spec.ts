import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import * as fixtures from './fixtures'
import createApp from '@/app'

const db = await createTestDatabase()
const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screening')

const app = createApp(db)

describe('GET', async () => {
  await createMovies(fixtures.movies)
  await createScreenings(fixtures.screenings)

  it('should return all screenings with movie title and year', async () => {
    const { body } = await supertest(app).get('/screenings').expect(200)

    expect(body).toHaveLength(3)
    expect(body).toEqual([
      {
        id: expect.any(Number),
        timestamp: '2024-01-20T10:00:00Z',
        ticketsTotal: 20,
        title: 'The Dark Knight',
        year: 2008,
      },
      {
        id: expect.any(Number),
        timestamp: '2024-01-22T15:00:00Z',
        ticketsTotal: 30,
        title: 'The Dark Knight',
        year: 2008,
      },
      {
        id: expect.any(Number),
        timestamp: '2024-01-21T22:00:00Z',
        ticketsTotal: 20,
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
        title: 'The Dark Knight',
        year: 2008,
      },
      {
        id: expect.any(Number),
        timestamp: '2024-01-22T15:00:00Z',
        ticketsTotal: 30,
        title: 'The Dark Knight',
        year: 2008,
      },
    ])
  })
})

describe('POST', () => {
  it('should create new screening in database', async () => {
    await supertest(app)
      .post('/screenings')
      .send({
        timestamp: '2024-01-25T14:30:00Z',
        ticketsTotal: 20,
        movieId: 22,
      })
      .expect(200, {
        id: 4,
      })
  })
})
