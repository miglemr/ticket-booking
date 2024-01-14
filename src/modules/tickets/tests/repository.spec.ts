import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import buildRepository from '../repository'
import * as fixtures from './fixtures'

const db = await createTestDatabase()
const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screening')
const createTickets = createFor(db, 'ticket')

const repository = buildRepository(db)

describe('findAll', async () => {
  await createMovies(fixtures.movies)
  await createScreenings(fixtures.screenings)

  it('should return all tickets from database', async () => {
    await createTickets(fixtures.tickets)

    const tickets = await repository.findAll()

    expect(tickets).toHaveLength(2)
    expect(tickets).toEqual([
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

describe('createBooking', async () => {
  it('should add a new ticket', async () => {
    const ticket = await repository.createBooking({
      screeningId: 1,
    })

    expect(ticket).toEqual([
      {
        id: expect.any(Number),
      },
    ])
  })

  it('should add multiple tickets', async () => {
    const tickets = await repository.createBooking([
      { screeningId: 1 },
      { screeningId: 1 },
      { screeningId: 2 },
    ])

    expect(tickets).toHaveLength(3)
  })
})
