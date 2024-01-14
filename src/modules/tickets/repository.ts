import { Insertable } from 'kysely'
import { Database, Ticket } from '@/database'

const TABLE = 'ticket'

type Row = Ticket
type RowWithoutId = Omit<Row, 'id'>
type RowInsert = Insertable<RowWithoutId>

export default (db: Database) => ({
  createBooking: async (screeningIds: RowInsert | RowInsert[]) =>
    db.insertInto(TABLE).values(screeningIds).returning(['id']).execute(),

  findAll: async () => db.selectFrom(TABLE).selectAll().execute(),
})
