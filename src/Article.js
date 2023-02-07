import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from './Context/AppState';
import { Icon } from '@iconify/react';
import ReactTimeAgo from 'react-time-ago'
import { useNavigate } from 'react-router-dom';



export default function Article({id,title,content,image,createdOn,authorEmail, author,category,video,}) {
  const navigate = useNavigate()
  const clickDelete = ()=>{
    navigate(`/delete/${id}`, {state:{author:authorEmail, title:title}})

  }  
  const { currUser } = UserAuth()
  return (
    <>
  
    
    
    <div className='w-full py-4 flex justify-start h-[200px] mb-[55px] '>
     
     <div className='w-[50%] h-full'>

            
              <Link to={`/article/${id}`}> <h1 className='font-bold text-[12px]'>{title}</h1></Link>
              
            <div className=' py-1 flex justify-start items-center'>
                  <h1 className='text-[8px]  px-1 text-slate-400'>By {author} - Created:<ReactTimeAgo date={createdOn.toDate().toString()} locale="en-US"/> - {category}</h1> 
                  
            </div>
           
          
            
            <hr/>
            <div className='h-[50%] overflow-hidden'>
            <p className='text-[13px] text-ellipsis overflow-hidden'>
                {content}
            </p>
            </div>
            <Link to={`/article/${id}`}></Link><button className='px-4 py-2 bg-slate-300 text-[11px] hover:bg-slate-500'>Read More</button>
        </div>

        <div className='w-[50%]  px-2 h-full mb-3 relative'>
        <Link to={`/article/${id}`}>
          <img
            alt= "article"
            className=' h-[200px] w-full py-2'
             src={image}/></Link>
         {currUser && currUser?.email === authorEmail? <div className='absolute bg-slate-200 flex justify-center w-[70px] top-0 mt-2 mx-2 shadow-2xl shadow-slate-600 right-[0px] rounded-bl-full p-2'>
                  <Icon icon="material-symbols:delete-outline"  onClick={clickDelete} className="cursor-pointer" fontSize='21px' color='blue'/> 
                  <Link to={`/editArticle/${id}`}><Icon icon="material-symbols:edit-document-outline-sharp" fontSize='20px' color="blue" /></Link>
            </div>: ""}
        </div>
     
        
    <hr/>
    </div>
 
    </>

  )
}
