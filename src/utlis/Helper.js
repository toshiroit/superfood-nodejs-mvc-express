import jwt from 'jsonwebtoken'
import moment from 'moment'
import Define from './Define'

const Helper = {

  /**
    * @param(day) set day return miliseconds``
    * @get a data after 1 day @return miliseconds
    *
    */
  getExpireDay: (day = 1) => {
    return moment().add(day, Define.DAYS).valueOf();
  },
  /*
   * @param{phone} set value phone get Jwt Token
   * @param{expires} set expires Jwt Token
   * @return token:string 
   */
  getJWTtoken: (phone, expires) => {
    if (expires) {
      return jwt.sign({ phone: phone }, process.env.ACCESS_SECRET, { expiresIn: expires })
    }
    else {
      return jwt.sign({ phone: phone }, process.env.ACCESS_SECRET);
    }
  },
  /**
   * @param{token} get token check verify is true return value token
   * @return email:string || throw Error
   */
  verifyJWTtoken: (token) => {
    try {
      if (!token) {
        throw new Error("Unauthorized Access")
      }
      const phone = jwt.verify(token, process.env.ACCESS_SECRET);
      return phone;
    } catch (error) {
      throw new Error("Unauthorized Access")
    }
  }

}
export default Helper;
