import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import { UserAuth } from './Context/AppState';

export default function CommentComponent({id,user,comments,date,deleteComment}) {
  const {currUser} = UserAuth()
  return (
    <div className='w-full  mb-[10px]'><h1 className='font-bold text-yellow-800 text-[8px]'>{user}</h1>
    <p className='text-[10px] pt-1 text-slate-500'>{comments}</p>
    <hr/>
    <div className='flex justify-between items-center'><h1 className='font-bold text-slate-500 py-2 text-[8px]'>posted: <ReactTimeAgo date={date.toDate().toString()} locale="en-US" /></h1>
    {currUser?.email === user && <h1 className='text-[8px] text-blue-600 font-bold cursor-pointer' onClick={deleteComment} >Delete</h1>}
    </div>

    
    </div>
  )
}
