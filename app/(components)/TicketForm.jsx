"use client"

import { useRouter } from "next/navigation"
import React, {useState} from "react"


const TicketForm = () => {

    const router = useRouter()

    const startingTicketData = {
        title:"",
        description:"",
        priority:1,
        progress:0,
        status:"Not Started",
        category:"Hardware Issue",
    }

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setFormData((preState) => ({
            ...preState,
            [name]:value,
        }))
    }



    const handleSubmit = async (e) => {
        e.preventDefault()


        const res = await fetch("/api/Tickets", {
            method:"POST",
            body: JSON.stringify({formData}),
            "content-type":"application/json"
        })


        router.refresh()
        router.push("/")
    }



    const [formData, setFormData] = useState(startingTicketData)

  return (
    <div className="flex justify-center">
    <form className="flex flex-col gap-3 w-1/2" method="post" onSubmit={handleSubmit} action="">
        <h3>Create your ticket</h3>
        <label htmlFor="">Title</label>
        <input type="text" id="title" name="title" onChange={handleChange} required value={formData.title}/>
        
        <label htmlFor="">Description</label>
        <input type="textarea" id="description" name="description" onChange={handleChange} required value={formData.description} rows={5}/>

        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleChange} id="">
            <option value="Hardware Issue">Hardware Issue</option>
            <option value="Software Issue">Software Issue</option>
            <option value="Project">Project </option>
        </select>

        <label>Priority</label>
        <div>
            <input type="radio" id="priority-1" name="priority" onChange={handleChange} value={1} checked={formData.priority == 1} />

            <label htmlFor="">1</label>


            <input type="radio" id="priority-2" name="priority" onChange={handleChange} value={2} checked={formData.priority == 2} />

            <label htmlFor="">2</label>

            <input type="radio" id="priority-3" name="priority" onChange={handleChange} value={3} checked={formData.priority == 3} />

            <label htmlFor="">3</label>


            <input type="radio" id="priority-4" name="priority" onChange={handleChange} value={4} checked={formData.priority == 4} />

            <label htmlFor="">4</label>


            <input type="radio" id="priority-5" name="priority" onChange={handleChange} value={5} checked={formData.priority == 5} />

            <label htmlFor="">5</label>

        </div>
        <label htmlFor="">Progress</label>
        <input type="range" id="progress" name="progress" value={formData.progress}min="0" max="100" onChange={handleChange} ></input>

        <label htmlFor="">Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
        <option value="Not Started">Not Started</option>

        <option value="Started">Started</option>


        <option value="Complete">Complete</option>
        </select>
        <input type="submit" className="btn" value="Create Ticket" />
    </form>
    </div>
  )
}

export default TicketForm
