
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from './admin/firebaseConfig'
import { collection,getDocs,} from 'firebase/firestore'
import Article from './Article'

export default function SearchResults() {
const [searchData, setSearchData] = useState("")
const [loading,setLoading] = useState(false)
const location = useLocation()
const searchItem = location.state

useEffect(()=>{
    const search = async()=>{
            setLoading(true)
            const searchQuery = collection(db, 'posts')
            const data = await getDocs(searchQuery)
            setSearchData(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            setLoading(false)
            

    
    }
    search()
},[searchItem])


 const searchDisplay = searchData && searchData.filter((item) => item.title.toLowerCase().includes(searchItem?.toLowerCase()) ||
               item.content.toLowerCase().includes(searchItem?.toLowerCase()))
               
console.log(searchDisplay) 

  return (
    <div className='w-full p-5'>
     {loading && <h1 className='text-center font-semibold'>Please wait...</h1>}
     <div className=' md:grid md:grid-cols-3 block gap-4'>
     {searchDisplay !== ""? searchDisplay.map(({id,title,content,imageUrl,createdOn,author,category,video}) =>  (
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
                ): <div className=' col-span-3'><h1 className='text-center font-bold text-sm'>No search result found</h1> </div>
                
                }
               
           </div>
           
          
        
     
           </div>
     
   


  )
    
}
