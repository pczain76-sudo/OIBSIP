import { useState, useEffect } from 'react'

import './App.css'

function App() {

  
  const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem('todos')
  return saved ? JSON.parse(saved) : []
})


const [input, setInput] = useState('')
  const [editText, setEditText] = useState("");


useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(tasks))
}, [tasks])


  const handlesubmit = () => {

    const newtask = {
      id: Date.now(),
      text: input,
      completed: false,
      isEditing: false,
      createdat: new Date().toLocaleTimeString()    
    }

    if (input.trim() === '') {
      return
    }

    setTasks([
      ...tasks, newtask
    ])

    setInput('')
  }

  console.log('tasks', tasks)


  const pendingtask = tasks.filter((task) => task.completed === false)
  const completedtask = tasks.filter((task) => task.completed === true)

  const handlecomplete=(id)=>{

    setTasks(
      tasks.map((task)=>task.id===id ?
    {
      ...task , completed:!task.completed
    }:task
    )
    )
  }

  const handledelete= (id)=>{
setTasks(
tasks.filter((task)=>task.id!==id)
)
  }


  const handleedit = (id,text)=>
  {
    setEditText(text)
    setTasks(
    tasks.map((task)=>task.id===id?{
      ...task , isEditing:!task.isEditing
    }:task)
  )
  }


  const handleupdate = (id)=>{

   
    setTasks(
      tasks.map((task)=>task.id===id?{
        ...task , text:editText , isEditing:false
      }:task)
       
    )
   
    setEditText('')
    
  }

  const handlecancel = (id)=>{

    setTasks(
      tasks.map((task)=>task.id===id?
    {
      ...task , isEditing:task.isEditing=false
    }:task)
    )
    setEditText('')

  }
 



  return (
    <>
      <div className='w-full max-w-3xl mx-auto my-4'>
  <div className='flex items-center rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition-all'>
    
    <input className='flex-1 text-sm text-gray-800 bg-transparent px-4 py-3 outline-none min-w-0 placeholder-gray-400' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Add your todo...' />
    
    <button className='bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-3 cursor-pointer active:scale-95 transition-all' onClick={handlesubmit}>Add</button>
    
  </div>

        <h1 className="cursor-pointer underline underline-offset-2 text-gray-600 hover:text-gray-900 transition-colors mb-3">Pending tasks({pendingtask.length})
        </h1>

        {pendingtask.map((task) =>

        (task.isEditing===true)?
<div className='flex items-center justify-between w-full max-w-3xl mx-auto my-2 bg-white border-2 border-blue-300 rounded-xl px-4 py-3'  key={task.id}>
  
 <input className='flex-1 text-sm text-gray-800 bg-blue-50 rounded-lg px-3 py-2 border border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 min-w-0' value={editText} onChange={(e)=>setEditText(e.target.value)}  />
 <div className='flex items-center gap-2 flex-shrink-0 ml-4'>
    <button className='w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer active:scale-95' onClick={()=>handleupdate(task.id)}>💾</button>
    <button className='w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer active:scale-95' onClick={()=>handlecancel(task.id)}>❌</button>
  </div>



  </div>
        

               :
              <div className="flex items-center justify-between w-full max-w-3xl mx-auto my-2 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:shadow-md transition-shadow duration-200 group" key={task.id}>
  <div className="flex items-center gap-3 min-w-0 flex-1">
    <span className={`text-sm font-medium truncate ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
      {task.text}
    </span>
  </div>
  <div className="flex-shrink-0 mx-4">
    <span className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded-md">
      {task.createdat}
    </span>
  </div>
  <div className="flex items-center gap-2 flex-shrink-0">
    <button 
      className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer active:scale-95"
      onClick={() => handlecomplete(task.id)}
      title="Complete"
    >
      ✅
    </button>
    <button 
      className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer active:scale-95"
      onClick={() => handleedit(task.id, task.text)}
      title="Edit"
    >
      ✏️
    </button>
    <button 
      className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer active:scale-95"
      onClick={() => handledelete(task.id)}
      title="Delete"
    >
      🗑
    </button>
  </div>

</div>
          
        
        )}
       

        <h1 className="cursor-pointer underline underline-offset-2 text-gray-600 hover:text-gray-900 transition-colors mb-3">
  Completed Tasks ({completedtask.length})
</h1>

{completedtask.map((task) =>
  <div className="flex items-center justify-between w-full max-w-3xl mx-auto my-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 hover:shadow-md transition-shadow duration-200 group" key={task.id}>
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <span className="text-sm font-medium truncate line-through text-gray-400">
        {task.text}
      </span>
    </div>
    <div className="flex-shrink-0 mx-4">
      <span className="text-xs text-gray-400 font-mono bg-white px-2 py-1 rounded-md border border-gray-100">
        {task.createdat}
      </span>
    </div>
    <div className="flex items-center gap-2 flex-shrink-0">
      <button 
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors cursor-pointer active:scale-95 text-base"
        onClick={() => handlecomplete(task.id)}
        title="Undo"
      >
        ↩
      </button>
      <button 
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer active:scale-95"
        onClick={() => handledelete(task.id)}
        title="Delete"
      >
        🗑
      </button>
    </div>

  </div>

        )}

      </div>



    </>
  )
}

export default App
