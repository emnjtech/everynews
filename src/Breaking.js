import React from 'react'

export default function Breaking({title,id}) {
  return (
    <div className='w-full flex items-center'>

       <div >
        <h1 className='font-bold text-[10px] md:text-sm moving-text md:p-7 overflow-hidden text-clip'>{title}</h1>
       </div>

    </div>
  )
}
