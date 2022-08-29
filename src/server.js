import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ratelimiter from 'express-rate-limit'
import helmet from 'helmet'
import csrf_mid from './routers/middleware/csrf_mid'
import error_mid from './routers/middleware/error_mid'
import authRouter from './routers/auth/auth.router'
dotenv.config()
const app = express();

/**
  *
  * @middleware
  *
  */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

//enable cors
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))
app.use(helmet())

//csrf 
app.use(csrf_mid.csrfInit)
app.use(csrf_mid.csurfToken)


//rate limiter

/**
 * @routers
 */

app.get('/', (req, res) => {
  res.send('home')
})


//description use for all type DB tables 

//@description auth (signup,login,logout,isLoggedIn)
app.use('/auth', authRouter)

app.use(error_mid)

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server running at localhost:${port}`)
})


