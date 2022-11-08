import Router from "express"
import Task from "../../models/Todo.js"
const router = Router()
router.get("/todos",async(req,res)=>{
    try{
     const tasks = await Task.find()
     res.status(200).json(tasks)
    }catch(error){
     res.status(500).json({message : error.message})
    }
  })
router.post("/todos",async(req,res)=>{
      const {body} = req
      try{
        const newTask = await Task.create(body)
        res.status(201).json(newTask)
      }catch(error){
        res.status(400).json({message: error.message})
      }
  })
router.put("/todos/:id",async(req,res)=>{
    const {id} = req.params
    const {body} = req
    try{
     const taskUpdate = await Task.findByIdAndUpdate(id,body,{new: true})
     res.status(200).json(taskUpdate)
    }catch(error){
     res.status(400).json({message: error.message})
    }
  })
router.delete("/todos/:id",async(req,res)=>{
    const {id} = req.params
    try{
     await Task.findByIdAndRemove(id)
     res.status(200).json()
    }catch(error){
    res.status(404).json({message: error.message})
    }
  })
  export default router