import React from 'react'


import { useNavigate,useParams,   useLocation } from 'react-router-dom'
import { UserAuth } from '../Context/AppState' 
import { useState,useRef } from 'react'
import { db } from './firebaseConfig'
import {  collection, Timestamp,getDocs, where, query,doc, onSnapshot, setDoc} from 'firebase/firestore'                                                                          
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {v4} from 'uuid'
import { useEffect } from 'react'
import ErrorAdmin from '../ErrorAdmin'
import { Icon } from '@iconify/react';



export default function EditArticle() {

    const {id} = useParams()
    const navigate = useNavigate()
    const [breakingNews,setBreakingNews] = useState(false)
    const { currUser, userLogout, updatePost } = UserAuth()
    const [admin,setAdmin] = useState("")
    const [article,setArticle] =useState("")
    const [category,setCategory] =useState("")

  const location = useLocation()
  const newImage = location.state
  console.log(location)
const handleBreaking =()=>{
    setBreakingNews(!breakingNews)
}
useEffect (() =>{
   
        const verifyAdmin = async() =>{
            if (currUser){
            const adminQuery = query(collection(db,'Admin'), where('email','==',currUser.email))
            const data = await getDocs(adminQuery)
            setAdmin(data.docs.map((doc) =>({...doc.data(), id:doc.id})))
        }
        else{
            navigate ('/')     
         }
    }
    const getFullArticle = ()=>{
        const docRef = doc(db, "posts", id);
        onSnapshot(docRef, (snapshot) => {
            setArticle({ ...snapshot.data(), id: snapshot.id })
            
        });
    }

   

   verifyAdmin()
   getFullArticle()
   
},[currUser])

useEffect(()=>{
    const getInitialValues =()=>{
        setBlogTitle(article?.title)
        setBlogContent(article?.content)
        setVideo(article?.video)
        }
        getInitialValues()
},[article])

    const [blogTitle, setBlogTitle] = useState("")
    const [blogContent, setBlogContent] = useState("")
    const [video, setVideo] = useState("")
console.log(article.imageUrl)

    const handleUpdateArticle = (e) => {
        e.preventDefault()
        const postcollectionref = doc(db, "posts",id)
        const blogObject = {
            title: blogTitle,
            content: blogContent,
            video:video,
            like:article.like,
            dislike:article.dislike,
            breakingNews:breakingNews,
            category:category,
            createdOn: Timestamp.now().toDate(),
            imageUrl: newImage? newImage : article.imageUrl,
            author:{
                name:"Admin",
                email:currUser?.email
            }}

        updatePost(postcollectionref, blogObject)
                    .then(() => {
                            toast("Article updated successfully", { type: "success" });
                            setBlogTitle("")
                            setBlogContent("")
                            setVideo("")

                        })
                        .catch((err) => {
                            toast("Error adding article", { type: "error" });
                        });
            
            }

        const logout = async () => {
            try {
                await userLogout()
                navigate('/')
                console.log("youlogged out")
            }
            catch (e) {
                alert(e.message)
            }


        }
function handleImageUpdate(){
    navigate(`/update-image/${id}`,  {state:{author:article.author.email, id:id, imgLink:article.imageUrl, title:article.title}})
}
    
    return (
    <>
          { admin?.length > 0 &&  <div className=" w-full p-4 md:flex justify-between ">
               
                    <div className='md:w-[30%] w-full h-[200px] my-6 p-8 bg-slate-400 rounded-3xl flex justify-center items-center'>
                        <div className='flex justify-center items-center'>
                          {admin?.map((item) =>(
                            <div>
                               <h1 className='text-white font-bold text-center'>WELCOME</h1><hr/>
                               <h5 className=' px-3 text-center font-bold pt-4'>{item.name}</h5>
                               <h5 className=' py-1 text-center text-[10px]'>{item.email}</h5>
                               <button onClick={logout}>Signout</button>
                          </div>
                          )) }
                        </div>
                    </div>
            
            <div className='md:w-[65%] w-full bg-slate-200 p-4 rounded-2xl'>
                 <div className='p-8'>

                    
                        <div>
                        <form onSubmit={handleUpdateArticle}>
                        <h1 className='text-[12px] font-extralight'>Title:</h1>
                        <input type="text" maxLength="100" className=' box-border w-full font-extralight text-[11px] h-[50px] rounded-lg p-4' value={blogTitle}  onChange={(event) => setBlogTitle(event.target.value)} /><br /><br />
                        <div className='flex justify-center items-center'><img src={newImage? newImage: article?.imageUrl} alt={article.title} className="w-full md:w-[150px] rounded-3xl mt-4"/>
                        <Icon icon="ri:image-edit-fill" onClick={handleImageUpdate} className=' text-5xl text-slate-500'/>
                        </div>
                        <ToastContainer />
                        <br />
                        <h1 className='text-[12px] font-extralight'>Video ID:</h1>
                        <input type="text" className=' box-border w-full h-[50px] font-extralight text-[11px] rounded-lg p-4' value={video} onChange={(event) => setVideo(event.target.value)} /><br /><br />
                        <h1 className='text-[12px] font-extralight'>Body content:</h1>
                        <textarea className='box-border w-full rounded-lg p-4 font-extralight text-[11px]'  
                        placeholder="Enter Blog Content.." cols="50" rows="10" value={blogContent} onChange={(event) => setBlogContent(event.target.value)} required/>
                        <div className='p-3 my-3 flex justify-start border-slate-800 border-[1px] rounded-lg'>
                          <input type="checkbox" checked={breakingNews} onChange={handleBreaking} /> 
                          <h1 className='text-[10px] px-2 font-semibold'>This is Breaking News</h1>
                        </div>
                            <label className='text-[12px] font-bold p-4'>Category</label>
                        <select name="category" value={category} className='w-full h-[30px] p-2 font-extralight text-[11px]' onChange={(event) => setCategory(event.target.value)} required>
       
                            <option hidden>Select Category</option>
                            <option value="Politics">Politics</option>
                            <option value="Sports">Sports</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="World News">World News</option>
                            <option value="Business">Business</option>
                            </select>

                        <button className='my-4 px-5 py-3' >Update</button>
                     </form>
                     </div>                    
                </div> 
            </div>
        

           </div> }
    </>    
     
  
  )
}
