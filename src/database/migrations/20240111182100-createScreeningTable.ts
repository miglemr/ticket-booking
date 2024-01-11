import { Kysely, SqliteDatabase } from 'kysely'

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('screening')
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('date', 'timestamp', (c) => c.notNull())
    .addColumn('tickets_total', 'integer', (c) => c.notNull())
    .addColumn('movie_id', 'integer', (c) =>
      c.references('movies.id').notNull()
    )
    .execute()
}

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.dropTable('screening').execute()
}
