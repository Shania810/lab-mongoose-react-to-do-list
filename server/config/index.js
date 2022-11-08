import cors from 'cors'
import express from 'express'
export default (app) =>{
    app.use(express.json())
    app.use(cors())
}

