import { Pool } from 'pg'

export const pool = new Pool({
    user: "postgres",
    password: "ryuu510564",
    host: "localhost",
    port: 5432,
    database: "biblioteca"
})