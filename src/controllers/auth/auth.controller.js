import bcryptjs from 'bcryptjs'
import AuthModel from '../../models/auth/auth.model'
import Response from '../../models/Response'
import Define from '../../utlis/Define'
import Helper from '../../utlis/Helper'

const AuthController = {

  /**
   * @description
   * get phone , username , password from req.body
   * do validation
   * ck already have an account or not (mysql Optional,Mongo required)
   * create password hash , save into database
   * generate a jwt access token , set into http cookie
   * return new user object as response
   * @param{phone,username,password} = req.body
   * @response {error(boolean),message(string),response(object:USER)}
   */
  signUp: async (req, res) => {
    try {
      const { phone, username, password } = req.body

      //validation
      if (!phone || username || password) {
        throw new Error('Enter value ')
      }
      if (password.length < 6) {
        throw new Error('Pass length should be atleast 6 char');
      }

      // get hash password  && save new user info db
      const hashpass = await bcryptjs.hash(password, await bcryptjs.genSalt(10));
      const user = {
        phone,
        username,
        hashpass
      }
      new AuthModel().addData('user', user, (err, results) => {
        if (err) {
          let response = new Response(true, err.message, err);
          res.send(response)
        }
        else {
          // get token and set into cookie
          const token = Helper.getJWTtoken(phone);

          // send token in http cookie with no expire
          res.cookie(Define.TOKEN, token, Define.SESSION_COOKIE_OPTION);

          delete user.password
          user['id'] = results.insertID
          user['token'] = token
          res.status(200).json(new Response(false, 'user create successfully', user))
        }
      })
    } catch (error) {
      let response = new Response(true, error.message, error)
      res.send(response)

    }
  },
  login: async (req, res) => {
    try {
      const { phone, username, password } = req.body
      if (!phone || username || password) {
        throw new Error('Enter value login')
      }
      new AuthModel().getUserByPhone('users', phone, async (err, results) => {
        try {
          if (err) {
            throw err
          }
          else {
            if (results.length === 0) {
              throw new Error('No user not found with this phone')
            }
            const user = results[0]
            const ckPass = await bcryptjs.compare(password, user.password);
            if (!ckPass) {
              throw new Error('Wrong phone or username or password')
            }

            // get token and set into cookie
            const token = Helper.getJWTtoken(phone);

            // send token in http cookie
            res.cookie(Define.TOKEN, token, Define.SESSION_COOKIE_OPTION);
            delete user.password
            user['token'] = token
            res.status(200).json(new Response(false, 'user logged in successfully', user))

          }
        } catch (error) {
          let response = new Response(true, e.message, error)
          res.send(response)
        }
      })
    } catch (error) {
      let response = new Response(true, e.message, error)
      res.send(response)
    }
  },
  logout: (req, res) => {
    res.cookie(Define.TOKEN, "", Define.LOGOUT_COOKIE_OPTION);
    res.status(200).json(new Response(false, 'user logged out', {}))
  },
  isLoggedIn: (req, res) => {
    try {
      const token = req.cookie.token
      if (!token) {
        throw new Error("Unauthorized Access");
      }

      // token validation
      Helper.verifyJWTtoken(token);
      res.send(true)
    } catch (err) {
      res.cookie('token', "", Define.LOGOUT_COOKIE_OPTION)
      res.send(false) // not logged in
    }
  }
}
export default AuthController;
