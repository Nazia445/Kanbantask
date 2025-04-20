import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'


const Layout = () => {
  const[istoggle,settoggle]=useState(false)
  const[input,setinput]=useState("")
  const[array,setarray]=useState([])

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
    .then((res)=>res.json())
    .then(data=>
     { const updated=data.map((item)=>({...item,status:"todo"}))
     setarray(updated)
    }
    )
  },[])

  const handlesubmit=(e)=>{
    e.preventDefault()
    if (input.trim() !== "") 
      {
        const newTask = {
          id:Date.now(),
          title: input,
          status: "todo", 
        };
      setarray((prev) => [...prev, newTask]);
      console.log(array)
      setinput(""); 
      settoggle(false)
    }
  }

  const handlebutton=(id,newStatus)=>{
    setarray((pre)=>(pre.map((item)=>(item.id==id?{...item,status:newStatus}:item))))
  }
  const todoTasks=array.filter(task=>task.status==="todo")
  const inProgressTasks = array.filter(task => task.status === "inProgress");
  const completedtasks=array.filter(task=>task.status==="Done")


  return (
    <div className='container' style={{marginTop:"25px",marginBottom:"20px"}}>
      <h3 className='display-6 fw-bold text-center mb-3' style={{color:"gray"}}>Kanban DashBoard</h3>
      <Button  className='btn btn-secondary d-block mx-auto mb-3 position-relative' onClick={(e)=>settoggle(!istoggle)}>Add task</Button>
      {istoggle&&<div className=' position-absolute  start-50 translate-middle-x'>

        <form onSubmit={handlesubmit}>
          <input type="text"
           placeholder='...add new task' 
           onChange={(e)=>setinput(e.target.value)}
           value={input}
          className='form-control'/>
        </form>
        </div>}

      
    <div className='d-flex justify-content-center gap-3 flex-wrap'>

      <div style={{ width:"250px",border:"1px solid grey",backgroundColor:"lightyellow",overflowY: 'auto', maxHeight: '450px'}} >
       <h5 className='text-center bg-danger p-2'>To-Do</h5>
       {todoTasks?.map((item)=>(
        <div className='card w-75 mx-auto mt-3 ' key={item.id}>
          <div className='card-body'>{item.title}</div>
          <button className='btn btn-secondary mx-auto mb-2' onClick={()=>handlebutton(item.id,"inProgress")}>Move to In progress</button>
        </div>
       ))}
        </div>
       
      <div   style={{width:"250px",height:"450px",border:"1px solid grey", backgroundColor:"lightyellow",overflowY: 'auto', maxHeight: '450px' }}>
      <h5  className='text-center bg-primary p-2'>In Progess</h5>
      {
         inProgressTasks?.map((item)=>(<div className='card w-75 mx-auto mt-3 ' key={item.id}>
         <div className='card-body'>{item.title}</div>
         <button className='btn btn-secondary mx-auto mb-2' onClick={()=>handlebutton(item.id,"Done")}>Move to Done</button>
       </div>
      ))
      }
      </div>

      <div  style={{width:"250px",height:"450px",border:"1px solid grey" ,backgroundColor:"lightyellow",overflowY: 'auto', maxHeight: '450px'}}>
      <h5  className='text-center bg-secondary p-2'>Done</h5>
      {
        completedtasks?.map((item)=>(<div className='card w-75 mx-auto mt-3 ' key={item.id}>
          <div className='card-body'>{item.title}</div>
         
        </div>))
      }
      </div>
    </div>
    </div>
  )
}

export default Layout