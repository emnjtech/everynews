import React, { useEffect, useState } from 'react'
import Headline from './Headline'
import { db } from './admin/firebaseConfig'
import {collection, where, query, getDocs,limit} from 'firebase/firestore'
export default function Hero() {
    const [breakingNews, setBreakingNews] = useState([])
const queryBreakingNews = query(collection(db, 'posts'), where('breakingNews', '==', true), limit(4))

 useEffect(() =>{
    const getBreaking = async () =>{
        const data = await getDocs(queryBreakingNews)
        setBreakingNews(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
getBreaking()
// eslint-disable-next-line
 },[])


  return (
    <>
    <div className='w-full mb-10 mx-auto md:h-[500px] h-fit grid grid-cols-1 md:grid-cols-2 bg-slate-300'>
      {breakingNews?.map(({title,content,imageUrl,id}) =>(
               <div>
            
               <Headline 
               title={title}
               content={content}
               image={imageUrl}
               id={id}
               key={id}
               />
               </div>
      
      
      ))  } 

       
        
    </div>
<div className='w-full md:h-[30px] h-[10px] bg-slate-200'>
  

</div>
    </>
  )
}
