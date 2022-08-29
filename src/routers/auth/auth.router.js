import express from 'express'
import AuthController from '../../controllers/auth/auth.controller'
import csrf_mid from '../middleware/csrf_mid'
const router = express.Router();


/**
  * @description 1. create a new user then login user
  * @param{email:String, name:String, pass:String} = req.body
  * @endpoint localhost/auth/signup
  *
  */
router.post('/signup', AuthController.signUp);
router.get('/hello', (req, res) => {
  res.send({ "hello": "Ok" })
})
//csrf protected roue

router.use(csrf_mid.csrfProtection)

export default router
