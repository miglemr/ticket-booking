import { Insertable } from 'kysely'
import { Database, Ticket } from '@/database'

const TABLE = 'ticket'

type Row = Ticket
type RowWithoutId = Omit<Row, 'id'>
type RowInsert = Insertable<RowWithoutId>

export default (db: Database) => ({
  createBooking: async (screeningIds: RowInsert[] | RowInsert) =>
    db.transaction().execute(async (trx) => {
      if (Array.isArray(screeningIds)) {
        const screeningIdArr = screeningIds.map(
          (screeningIdObj) => screeningIdObj.screeningId
        )

        await trx
          .updateTable('screening')
          .set((eb) => ({
            ticketsLeft: eb('ticketsLeft', '-', 1),
          }))
          .where('id', 'in', screeningIdArr)
          .executeTakeFirst()
      } else {
        await trx
          .updateTable('screening')
          .set((eb) => ({
            ticketsLeft: eb('ticketsLeft', '-', 1),
          }))
          .where('id', '=', Object.values(screeningIds))
          .executeTakeFirst()
      }

      return trx
        .insertInto(TABLE)
        .values(screeningIds)
        .returning(['id'])
        .execute()
    }),
  findAll: async () => db.selectFrom(TABLE).selectAll().execute(),
})
