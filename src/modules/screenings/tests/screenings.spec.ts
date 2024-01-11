import supertest from 'supertest'
import createDatabase from '@/database'
import createApp from '@/app'

const db = createDatabase(process.env.DATABASE_URL as string, {
  readonly: true,
})

const app = createApp(db)

describe('GET', () => {
  it('should return all screenings with movie title and year', async () => {
    const { body } = await supertest(app).get('/screenings').expect(200)

    expect(body).toHaveLength(3)
    expect(body).toEqual([
      {
        id: expect.any(Number),
        date: '2024-01-20 10:00:00',
        ticketsTotal: 20,
        title: 'The Matrix',
        year: 1999,
      },
      {
        id: expect.any(Number),
        date: '2024-01-22 22:00:00',
        ticketsTotal: 25,
        title: 'Home Alone',
        year: 2016,
      },
      {
        id: expect.any(Number),
        date: '2024-01-28 21:30:00',
        ticketsTotal: 15,
        title: 'The Matrix',
        year: 1999,
      },
    ])
  })

  it('should return all screenings for provided movie id', async () => {
    const { body } = await supertest(app).get('/screenings/133093').expect(200)

    expect(body).toHaveLength(2)
    expect(body).toEqual([
      {
        id: expect.any(Number),
        date: '2024-01-20 10:00:00',
        ticketsTotal: 20,
        title: 'The Matrix',
        year: 1999,
      },
      {
        id: expect.any(Number),
        date: '2024-01-28 21:30:00',
        ticketsTotal: 15,
        title: 'The Matrix',
        year: 1999,
      },
    ])
  })
})
