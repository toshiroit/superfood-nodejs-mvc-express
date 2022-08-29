import dotenv from 'dotenv'
import pool from '../configs/db'
import Define from '../utlis/Define'
import { SQL_DELETE_DATA, SQL_GET_ALL, SQL_GET_ONE, SQL_GET_PAGINATE_LIST, SQL_INSERT_DATA, SQL_UPDATE_DATA } from './query/query'
dotenv.config()

class Model {
  // Get data find one value
  getOne = async (table, field, value, callback) => {

    pool.query(SQL_GET_ONE(table), [field, value], callback);
  }


  /** 
   * @param {table} table
   * @param {what you want to insert} obj
   * @param {callback} (err,result=>{})
   */
  addData = (table, obj, callback) => {
    pool.query(SQL_INSERT_DATA(table), obj, callback);
  }

  /**
   * @param {table name} table
   * @param {condition name} condition sql 
   * @param {what you to insert} obj
   * @param {callback} (err,result=>{})
   */
  updateData = (table, condition, obj, callback) => {
    pool.query(SQL_UPDATE_DATA(table, condition), [obj, obj.condition], callback);
  }

  /**
   * @param {table} table
   * @param {condition} condition
   * @param {err,result()=>{}} callback
   */
  deleteData = (table, condition, value, callback) => {
    pool.query(SQL_DELETE_DATA(table, condition), value, callback);
  }

  /**
   * @param {table} table
   * @param {condition } condition
   * @param {err,result()=>{}} callback
   */
  getAll = (table, field, callback) => {
    pool.query(SQL_GET_ALL(table, field), callback)
  }

  /**
   * @param {page} page number (1,2,3,4,5,.....)
   * @param {table} table name
   * @param {field} where filter apply on which field
   * @param {value} where filter value
   * @param {order_field} order by field
   * @param {callback} (error,result)=>{}
   */
  getPaginateList = (page,table, field, value, field2 = "", value2 = -1, order_field, callback) => {
    // implement pagination here later
    const page_size = Define.PAGINATE_PAGE_SIZE;
    let skip = (page - 1) * page_size;

    if(value2 === -1 && field2 === ""){
      pool.query(SQL_GET_PAGINATE_LIST(table),[field,value,order_field,page_size,skip],callback);
    }
    else {
      pool.query(SQL_GET_PAGINATE_LIST(table),[field,value,field2,page_size,skip],callback);
    }
  }

}
export default Model;
