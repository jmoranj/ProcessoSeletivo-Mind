import express from "express"
import cors from "cors"
import fileupload from "express-fileupload"

import {userRoute} from './routes/userRoute'

export const app = express()

app.use(express.json())
app.use(cors())

app.use('/', userRoute)