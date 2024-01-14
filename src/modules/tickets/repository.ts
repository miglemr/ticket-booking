import { Database } from '@/database'

const TABLE = 'ticket'

export default (db: Database) => ({
  createBooking: async (screeningId: number) =>
    db
      .insertInto(TABLE)
      .values({
        screeningId,
      })
      .returning(['id'])
      .executeTakeFirst(),

  findAll: async () => db.selectFrom(TABLE).selectAll().execute(),
})
