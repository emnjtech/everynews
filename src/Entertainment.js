import React, { useEffect, useState } from 'react'

import people from './assets/people.png'
import Article from './Article';
import { db } from './admin/firebaseConfig'
import { collection,query, where,  orderBy, onSnapshot} from 'firebase/firestore'


export default function Entertainment() {
    const [entertainmentNews, setEntertainmentNews] = useState("")

    const entertainment = query(collection(db,'posts'), where("category", '==','Entertainment'), orderBy('createdOn','desc'))
 useEffect(()=>{
    const getEntertainment =()=>{
        onSnapshot(entertainment,(snapshot)=>{
            setEntertainmentNews(snapshot.docs.map((item)=>({...item.data(), id:item.id})))
        })

    }
    getEntertainment()
 },[])
  return (
    <div className='w-full'>
        <div className='bg-black w-full h-[150px] flex relative '>
                 <div className='absolute  justify-end  flex items-center md:bottom-[-40px] bottom-[-20px]  '>
 
       
            
            <h1 className='md:text-[100px] text-[45px] text-white font-extrabold '>
            Entertainment
            </h1>
                 </div>
                 <div className='absolute  justify-end opacity-50 flex items-center bottom-[-48px]'>
 
       
            
        <img src={people} alt="people" width="300px" />
                 </div>
        </div>

      <div className='my-[50px] px-4'>
        <div className=' md:grid md:grid-cols-3 gap-4 block'>

        {entertainmentNews && entertainmentNews.map(({id,title,content,imageUrl,createdOn,author,category,video}) =>  (
                      <div key={id}> 
                       <Article
                       
                       id ={id}
                       title ={title}
                       content ={content}
                       image = {imageUrl}
                       createdOn = {createdOn}
                       author ={author.name}
                       authorEmail={author.email}
                       category ={category}
                       video={video}
                      
                       
                       />
                       
                   </div>
                   
                    )
                )
                
                }

            

        </div>


      </div>








    </div>
  )
}
