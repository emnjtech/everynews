import React from 'react'
import Article from './Article'
import { collection, getDocs, where,query,limit, onSnapshot } from 'firebase/firestore';
import { db } from './admin/firebaseConfig'
import {useState,useEffect} from 'react'
import ArticleBottom from './articleBottom'
import ArticleRight from './articleRight'
import ArticleRB from './articleRB'
import { ToastContainer } from 'react-toastify';





export default function Home() {

    const [politics, setPolitics] = useState([])
    const [worldNews, setWorldNews] = useState([])
    const [sports, setSports] = useState([])
    const [entertainment, setEntertainment] = useState([])

    const queryPolitics = query(collection(db, "posts"), where("category","==","Politics"), limit(4))
    const querySports = query(collection(db, "posts"), where("category","==","Sports"), limit(4))
    const queryEnt = query(collection(db, "posts"), where("category","==","Entertainment"), limit(4))
    const queryWorldNews = query(collection(db, "posts"), where("category","==","World News"), limit(4))
   

    useEffect(() => {
      const getPolitics = () => {
        onSnapshot(queryPolitics, (snapshot) =>{
         setPolitics(snapshot.docs.map((doc) =>({ ...doc.data(), id: doc.id })))
        })
        
      }
      const getSports = ()=>{
         onSnapshot(querySports,(snapshot)=>{
            setSports(snapshot.docs.map((doc) =>({...doc.data(), id: doc.id})))
         })
         
      }

      const getEntertainment = () => {
         onSnapshot(queryEnt,(snapshot)=>{
            setEntertainment(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
         })
         
       }
       const getWorldNews = async()=>{
          const data = await getDocs(queryWorldNews)
          setWorldNews(data.docs.map((doc) =>({...doc.data(), id: doc.id})))
       }
       
      getPolitics()
      getSports()
      getEntertainment()
      getWorldNews()
 // eslint-disable-next-line     
    }, [])
    console.log(politics)


  
    //function refreshPage() {
    //  window.location.reload(false);
    //}
   
    
   // var tube = "https://www.youtube.com/embed/"
   //var videoLink=tube+video

    return (
        <div className='w-full md:flex justify-between'>
        <div className='md:w-[55%] px-4'>
         <ToastContainer />
            <div className='py-2 flex justify-center mt-10'>
             <h1 className='font-bold'>POLITICS</h1>
         
            </div>
            <hr/>
        {politics?.map(({
        id,
        title,
        content,
        imageUrl,
        createdOn,
        author,
        category,
        video,
      }) =>  (
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
        )}
           
            <div className='w-full px-4 my-5'>
              <hr/>
               <h1 className='font-bold text-center py-2'>WORLD NEWS</h1>
               <hr/>
            </div>
            
            <div className='w-full grid grid-cols-2 gap-2 '>
            {worldNews?.map(({
        id,
        title,
        content,
        imageUrl,
        createdOn,
        author,
        category,
        video,
      }) =>  (
               <div key={id}>
                  <ArticleBottom 
                  
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
      ))}
         </div>
            

        </div>
       <div className='md:w-[45%] px-4  mt-10'>
       <div className='py-2 flex justify-center'>
             <h1 className='font-bold'>SPORTS</h1>  
       </div>
        <hr/>
           <div className='py-6 grid grid-cols-2 gap-2'>
           {sports?.map(({
        id,
        title,
        content,
        imageUrl,
        createdOn,
        author,
        category,
        video,
      }) =>  (
                 <div key={id}>
                  <ArticleRight 
                  
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
                  
      ))}


           </div>
           <div className='w-full md:px-4'>
             
               <h1 className='font-bold text-center'>ENTERTAIMENT</h1>
               <hr/>
            </div>
            
            <div className='w-full grid grid-cols-2 gap-2'>
            {entertainment?.map(({
        id,
        title,
        content,
        imageUrl,
        createdOn,
        author,
        category,
        video,
      }) =>  (
               <div>
               
                  <ArticleRB
                  
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
      ))} 
         </div>
            



        </div>

       
    
    </div>
  )
}
