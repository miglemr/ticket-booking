import { Selectable } from 'kysely'
import type { Movies, Database } from '@/database'

const TABLE = 'movies'
type Row = Movies
type RowSelect = Selectable<Row>

export default (db: Database) => ({
  findAll: async (limit = 10, offset = 0): Promise<RowSelect[]> =>
    db.selectFrom(TABLE).selectAll().limit(limit).offset(offset).execute(),

  findByIds: async (ids: number[]) =>
    db.selectFrom(TABLE).selectAll().where('id', 'in', ids).execute(),
})
