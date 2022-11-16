import express from 'express'
import { putSignup } from '../controllers/authController'

const router = express.Router()



router.put('/signup',putSignup)

export default router