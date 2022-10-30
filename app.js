import express from "express"
import mongoose from "mongoose"
//import mongoose from "mongoose"
import Task from "./models/Todo.js"
const MONGODB_URI = "mongodb://localhost:27017/task-app"

mongoose.connect(MONGODB_URI)
  .then((x)=>{
    console.log(`Conected to the database: ${x.connection.name}`)
  })
  .catch(()=>
  console.log("não consegui conectar ao database"))

const app = express()
app.use(express.json())

app.get("/todos",async(req,res)=>{
  try{
   const tasks = await Task.find()
   res.status(200).json(tasks)
  }catch(error){
   res.status(500).json({message : error.message})
  }
})
app.post("/todos",async(req,res)=>{
    const {body} = req
    try{
      const newTask = await Task.create(body)
      res.status(201).json(newTask)
    }catch(error){
      res.status(400).json({message: error.message})
    }
})
app.put("/todos/:id",async(req,res)=>{
  const {id} = req.params
  const {body} = req
  try{
   const taskUpdate = await Task.findByIdAndUpdate(id,body,{new: true})
   res.status(200).json(taskUpdate)
  }catch(error){
   res.status(400).json({message: error.message})
  }
})
app.delete("/todos/:id",async(req,res)=>{
  const {id} = req.params
  try{
   await Task.findByIdAndRemove(id)
   res.status(200).json()
  }catch(error){
  res.status(404).json({message: error.message})
  }
})

const PORT = 3000
app.listen(PORT,()=>console.log(`https://www.localhost:${PORT} is running`))