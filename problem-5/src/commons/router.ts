import express from "express"
import user from "../controllers/user.controller"

const rootRouter = express.Router()

rootRouter.use('/user', user)

export default rootRouter