import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import buildRepository from '../repository'
import * as fixtures from './fixtures'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screening')

describe('findAll', async () => {
  await createMovies(fixtures.movies)
  await createScreenings(fixtures.screenings)

  it('should return all existing screenings with movie title and year', async () => {
    const screenings = await repository.findAll()

    expect(screenings).toHaveLength(3)
    expect(screenings).toEqual([
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
})

describe('findById', async () => {
  it('should return all screenings for provided movie id', async () => {
    const screenings = await repository.findById(22)

    expect(screenings).toEqual([
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

  it('should return an empty list if there are no screenings for a movie', async () => {
    const screenings = await repository.findById(56)

    expect(screenings).toEqual([])
  })
})

describe('createScreening', () => {
  it('should create a new screening', async () => {
    await repository.createScreening({
      timestamp: '2024-01-25T14:30:00Z',
      ticketsTotal: 20,
      movieId: 234,
    })

    const screenings = await repository.findAll()

    expect(screenings).toContainEqual({
      id: expect.any(Number),
      timestamp: '2024-01-25T14:30:00Z',
      ticketsTotal: 20,
      title: 'Sherlock Holmes',
      year: 2009,
    })
  })
})
