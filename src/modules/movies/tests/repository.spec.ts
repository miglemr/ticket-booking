import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import buildRepository from '../repository'
import * as fixtures from './fixtures'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createMovies = createFor(db, 'movies')

describe('findAll', () => {
  it('should return existing movies', async () => {
    // ARRANGE (Given that we have the following record in the database...)
    // directly create movies in the database
    await createMovies(fixtures.movies)

    // ACT (When we call...)
    const movies = await repository.findAll()

    // ASSERT (Then we should get...)
    expect(movies).toEqual([
      {
        id: expect.any(Number),
        title: 'The Dark Knight',
        year: 2008,
      },
      {
        id: expect.any(Number),
        title: 'Sherlock Holmes',
        year: 2009,
      },
      {
        id: expect.any(Number),
        title: 'Inception',
        year: 2010,
      },
    ])
  })
})

describe('findByIds', () => {
  it('should return a list of movies by their ID', async () => {
    // ACT (When we call...)
    // select a few of them
    const movies = await repository.findByIds([234, 4153])

    // ASSERT (Then we should get...)
    // expect to have only the selected movies
    expect(movies).toHaveLength(2)
    expect(movies).toEqual([
      {
        id: 234,
        title: 'Sherlock Holmes',
        year: 2009,
      },
      {
        id: 4153,
        title: 'Inception',
        year: 2010,
      },
    ])
  })

  it('should return an empty list if there are no matching IDs', async () => {
    const movies = await repository.findByIds([55, 32])

    expect(movies).toHaveLength(0)
    expect(movies).toEqual([])
  })
})
