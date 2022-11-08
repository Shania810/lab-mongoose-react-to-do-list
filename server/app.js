import * as dotenv from 'dotenv'
dotenv.config()

import connectDatabase from './db/db.config.js'
connectDatabase()

import express from "express"
const app = express()

import config from './config/index.js'
config(app)

import taskRoutes from "./routes/tasks/task.routes.js"
app.use('/',taskRoutes)

import authRoutes from "./routes/auth/auth.routes.js"
app.use('/',authRoutes)

export default app