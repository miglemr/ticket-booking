import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import createApp from '@/app'

const db = await createTestDatabase()
const app = createApp(db)

describe('POST', () => {
  it('should add a new ticket to database', async () => {
    const ticket = await supertest(app).post('/tickets/1').expect(201)

    expect(ticket).toEqual({
      id: expect.any(Number),
    })
  })
})
