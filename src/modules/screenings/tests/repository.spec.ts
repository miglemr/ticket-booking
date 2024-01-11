import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import buildRepository from '../repository'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screening')

describe('findAll', async () => {
  await createMovies([
    {
      id: 22,
      title: 'The Dark Knight',
      year: 2008,
    },
    {
      id: 234,
      title: 'Sherlock Holmes',
      year: 2009,
    },
  ])

  await createScreenings([
    {
      date: '2024-01-20 10:00:00',
      ticketsTotal: 20,
      movieId: 22,
    },
    {
      date: '2024-01-22 15:00:00',
      ticketsTotal: 30,
      movieId: 22,
    },
    {
      date: '2024-01-21 22:00:00',
      ticketsTotal: 20,
      movieId: 234,
    },
  ])

  it('should return all existing screenings with movie title and year', async () => {
    const screenings = await repository.findAll()

    expect(screenings).toHaveLength(3)
    expect(screenings).toEqual([
      {
        id: expect.any(Number),
        date: '2024-01-20 10:00:00',
        ticketsTotal: 20,
        title: 'The Dark Knight',
        year: 2008,
      },
      {
        id: expect.any(Number),
        date: '2024-01-22 15:00:00',
        ticketsTotal: 30,
        title: 'The Dark Knight',
        year: 2008,
      },
      {
        id: expect.any(Number),
        date: '2024-01-21 22:00:00',
        ticketsTotal: 20,
        title: 'Sherlock Holmes',
        year: 2009,
      },
    ])
  })
})
