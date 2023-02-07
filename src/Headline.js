import React from 'react'
import { Link } from 'react-router-dom'
export default function Headline({title,content,id,image}) {
  return (
    <div className='w-full'>
        
        <div className='relative'>
          <Link to={`/article/${id}`}>
            <img 
            alt="frame 1"
            className='w-full h-[300px]'
           
            src={image} />
       
        <div className='w-[95%] mx-3 h-[80px] headline p-2 absolute  bottom-[10px] border-l-4 border-yellow-500'>
            <h1 className='font-bold text-[11px] text-white'>{title}</h1><hr/>
            <p className='text-white text-[10px] truncate max-w-[100ch]'>
            {content} </p>

            </div>
            </Link>
        </div>


    </div>
  )
}
