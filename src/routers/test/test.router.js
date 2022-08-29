import express from 'express'
import TestController from '../../controllers/test/test.controller'
import auth_mid from '../middleware/auth_mid'
const router = express.Router()


/**
  * @private route
  * @description 1. create a new data
  * @param{data:String} = req.body
  * @endpoint localhost/new-data
  * @example same
  */
router.post('/new-data', auth_mid, TestController.newData)

export default router;
