import { useEffect, useState } from 'react'
import { Button } from './Button'
import { InputBox } from './InputBox'
import User from './User'
import axios from 'axios'

const Users = ({from}) => {
  const [users,setUsers]=useState([])
  const [input,setInput]=useState('')
  useEffect(()=>{
    axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${input}`)
    .then(response=>{setUsers(response.data.user)})
  },[input])
  return (
    <div className="flex-col gap-0 ml-3 felx">
      <div className='text-lg font-semibold'>
        Users
      </div>
      <div className='shadow-sm'>
        <InputBox lable2={'Search...'} onChange={(e)=>{setInput(e.target.value)}}/>
      </div>
      {users.map((user)=>{return <User from={from} user={user} key={user._id}/>})}
    </div>
  )
}

export default Users