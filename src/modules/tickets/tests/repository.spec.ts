import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import buildRepository from '../repository'
import * as fixtures from './fixtures'

const db = await createTestDatabase()
const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screening')
const repository = buildRepository(db)

describe('createBooking', async () => {
  await createMovies(fixtures.movies)
  await createScreenings(fixtures.screenings)

  it('should add a new ticket', async () => {
    const ticket = await repository.createBooking({
      screeningId: 1,
    })

    expect(ticket).toEqual({
      id: expect.any(Number),
    })
  })
})
