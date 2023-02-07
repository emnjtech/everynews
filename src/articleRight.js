import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import { Link } from 'react-router-dom'
import { UserAuth } from './Context/AppState';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function ArticleRight({id,title,content,image,createdOn,authorEmail, author,category,}) {
  const navigate = useNavigate()

  const clickDelete = ()=>{
    navigate(`/delete/${id}`, {state:{author:authorEmail, title:title}})

  }  
  const { currUser } = UserAuth()

  return (
    <div className='w-full h-[350px] mb-[-20px]'>
         <div className='w-full h-[150px] relative'>
         <Link to={`/article/${id}`}>
           <img
            alt= "article"
            className='h-full w-full'
             src={image}/></Link> 
         {currUser && currUser?.email === authorEmail? <div className='absolute bg-slate-200 flex justify-center w-[70px] top-0 shadow-2xl shadow-slate-600 right-[0px] rounded-bl-full p-2'>
                  <Icon icon="material-symbols:delete-outline"  onClick={clickDelete} className="cursor-pointer" fontSize='21px' color='blue'/> 
                  <Link to={`/editArticle/${id}`}><Icon icon="material-symbols:edit-document-outline-sharp" fontSize='20px' color="blue" /></Link>
            </div>: ""}
        </div>
    
        <div className='w-full'>
          <div className='h-[70px] overflow-hidden text-ellipsis'>
          <Link to={`/article/${id}`}> <h1 className='font-bold'>{title}</h1></Link> 
          </div>
            <div className='flex py-1'>
            <h1 className='text-[8px] text-slate-400'>Author: {author} - Date Posted: <ReactTimeAgo date={createdOn.toDate().toString()} locale="en-US"/> - {category} </h1> 
            </div>
            
            <hr/>
            <div className='h-[50px] overflow-hidden text-ellipsis'>
            <p className='text-[13px] py-4'>
            {content}
            
            
            </p>
            </div>
           <div className='py-2'>
            <button className='px-4 py-2 bg-slate-300 text-[11px]'>Read More</button>
           </div>


        </div>
       
    <hr/>
    </div>
  )
}
