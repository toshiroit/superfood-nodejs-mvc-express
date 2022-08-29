import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const host = (`${process.env.NODE_ENV}` === 'DEV') ? `${process.env.DB_HOST_DEV}` : `${process.env.DB_HOST_PRIVATE}`;
const user = (`${process.env.NODE_ENV}` === 'DEV') ? `${process.env.DB_USER_DEV}` : `${process.env.DB_USER_PRIVATE}`;
const pass = (`${process.env.NODE_ENV}` === 'DEV') ? `${process.env.DB_PASS_DEV}` : `${process.env.DB_PASS_PRIVATE}`;
const database = (`${process.env.NODE_ENV}` === 'DEV') ? `${process.env.DB_DATABASE_DEV}` : `${process.env.DB_DATABASE_PRIVATE}`;

const pool = mysql.createConnection({
  connectTimeout: 10,
  host: host,
  user: user,
  password: pass,
  database: database,
  timezone: 'gmt+7'
})
export default pool;
