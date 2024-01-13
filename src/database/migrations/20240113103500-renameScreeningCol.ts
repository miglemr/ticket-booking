import { Kysely, SqliteDatabase } from 'kysely'

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .alterTable('screening')
    .renameColumn('date', 'timestamp')
    .execute()
}

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema
    .alterTable('screening')
    .renameColumn('timestamp', 'date')
    .execute()
}
