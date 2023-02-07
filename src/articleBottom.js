import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from './Context/AppState';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
export default function ArticleBottom({id,title,image,authorEmail,}) {
  const navigate = useNavigate()

  const clickDelete = ()=>{
    navigate(`/delete/${id}`, {state:{author:authorEmail, title:title}})

  }  
  const { currUser } = UserAuth()

  return (
    <div className='w-full py-4 h-[200px] mb-3'>
         <div className='w-full py-2 h-[150px] relative'>
         <Link to={`/article/${id}`}> <img
            alt= "article"
            className='h-full w-full'
             src={image}/></Link>
           {currUser && currUser?.email === authorEmail? <div className='absolute bg-slate-200 flex justify-center w-[70px] top-0 mt-2 shadow-2xl shadow-slate-600 right-[0px] rounded-bl-full p-2'>
                  <Icon icon="material-symbols:delete-outline"  onClick={clickDelete} className="cursor-pointer" fontSize='21px' color='blue'/> 
                  <Link to={`/editArticle/${id}`}><Icon icon="material-symbols:edit-document-outline-sharp" fontSize='20px' color="blue" /></Link>
            </div>: ""}
        </div>
    
        <div className='w-full title h-[50px]'>
        <Link to={`/article/${id}`}><h1 className='font-bold '>{title}</h1></Link>
            <hr/>
        </div>
       
    <hr/>
    </div>
  )
}
