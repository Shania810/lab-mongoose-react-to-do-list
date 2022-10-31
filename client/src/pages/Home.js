import React, { useEffect, useState } from 'react'
import "./Home.css"
import axios from "axios"
import deleteButton from "../images/buttonDelete.png"
export const Home = () => {
  const [tasks,setTasks] = useState([])
  const [newTask,setNewTask]= useState("")
  const getTaks = async()=>{
    try{    
    const {data} = await axios.get("http://localhost:5000/todos")
    setTasks(data)
    }catch(error){
    console.log(error.message)
    }
  }
  const postTask = async(e)=>{
    e.preventDefault()
    const newTaskObject ={
        title: newTask,
        completed:false
    } 
    try{
       await axios.post("http://localhost:5000/todos",newTaskObject)
       getTaks() 
       setNewTask("")
    }catch(error){
        console.log(error.message)
    }
  }
  const updateTask = async(id,taskState)=>{
    try{
      await axios.put(`http://localhost:5000/todos/${id}`,{completed:!taskState})
      getTaks()
    }catch(error){
        console.log(error.message)
    }
  }
  const deleteTask = async(id)=>{
   try{
     await axios.delete(`http://localhost:5000/todos/${id}`)
     getTaks()
   }catch(error){
     console.log(error)
   }
}
  useEffect(()=>{
    getTaks()
  },[])
  return (
    <div>
      <div id='title'>To Do List
    </div>
        <div>
          <form onSubmit={(e)=> postTask(e)} >
            <input type="text" id='input-text' value={newTask} onChange={(e)=> setNewTask(e.target.value)} />
            <button id='button-adicionar' >Adicionar</button>
          </form>
        </div>
        <div id='container-tasks' >
          {tasks.map((task)=>{
           return <div key={task._id} className="container-task">
           <div className='content-task'>
           <div className='content-task-checkbox-title' >
            <input type="checkbox" className='checkbox' onClick={()=>updateTask(task._id,task.completed)} />
            <label className={task.completed ? "riscado task-title" : "task-title"} >{task.title}</label>
            </div>
            <div>
            <img src={deleteButton} className="button-delete" alt="x button"onClick={()=>deleteTask(task._id)} />
            </div>
            </div>
           </div>
          })}
        </div>
    </div>
  )
}
