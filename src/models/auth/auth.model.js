import pool from '../../configs/db';
import Model from '../Model'
class AuthModel extends Model {
  getUserByPhone = async (table, phone, callback) => {
    let sql = `SELECT * FROM ${table} where phone=?`;
    pool.query(sql,phone, callback);
  }
}

export default AuthModel;
