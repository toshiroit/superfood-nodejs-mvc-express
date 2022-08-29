/**
 * @param {table} table
 * @param {return value get one}
 */
export const SQL_GET_ONE = (table) => `SELECT * FROM ${table} WHERE ??=?`;

/**
 * @param {table} table
 * @param {insert table data}
 */
export const SQL_INSERT_DATA = (table) => `INSERT INTO ${table} SET ?`;

/**
 * @param {table} table
 * @param {condition} condition => name of string 
 * @param {update data table by condition}
 */
export const SQL_UPDATE_DATA = (table, condition) => `UPDATE ${table} SET ? WHERE ${condition}=?`;

/**
 * @param {table} table
 * @param {condition} condition => name of string 
 * @param {delete data table by condition}
 */
export const SQL_DELETE_DATA = (table, condition) => `DELETE FROM ${table} WHERE ${condition}=?`;

/**
 * @param {table} table
 * @param {condition} condition => name of string 
 * @param {Get all data table field}
 */
export const SQL_GET_ALL = (table, field) => `SELECT * FROM ${table} ORDER BY ${field} DESC`;

/**
 * @param {table} table
 * @param {condition} condition => name of string 
 * @param {update data table by condition}
 */

export const SQL_GET_ALL_BY_FIELD = () => `SELECT * FROM ?? WHERE ??=? ORDER_BY ?? DESC`;

/**
 * @param {table} table
 * @param {get paginate list by table value }
 */
export const SQL_GET_PAGINATE_LIST = (table) => `SELECT * FROM ${table} WHERE ??=? ORDER BY ?? DESC LIMIT ? OFFSET ?`;
export const SQL_GET_PAGINATE_LIST_2 = (table) => `SELECT * FROM ${table} WHERE ??=? AND ORDER BY ?? DESC LIMIT ? OFFSET ?`;


