import mysql from 'mysql2/promise'
import { env } from '../../env/env.js'

const { host, user, password, database, TABLE_ESTUDIANTE, TABLE_ESTUDIANTE_PROYECTO, TABLE_PROYECTOS } = env

const connection = await mysql.createConnection({
  host,
  user,
  password,
  database
})


export async function getAllProjects () {
  const [result] = await connection.query(`SELECT * FROM ${TABLE_PROYECTOS}`)
  return result
}
