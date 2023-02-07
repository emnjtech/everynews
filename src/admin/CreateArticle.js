import React from 'react'


import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../Context/AppState' 
import { useState } from 'react'
import { db } from './firebaseConfig'
import {  collection, Timestamp,getDocs, where, query } from 'firebase/firestore'                                                                          
import { storage} from './firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {v4} from 'uuid'
import { useEffect } from 'react'


export default function CreateArticle() {
    const navigate = useNavigate()
    const [blogTitle, setBlogTitle] = useState("")
    const [category, setCategory] = useState("")
    const [blogContent, setBlogContent] = useState("")
    const [video, setVideo] = useState("")
    const [breakingNews,setBreakingNews] = useState(false)
    const [imageUpl, setImageUpl] = useState(null)
    const [uplProgress, setUplProgress] = useState("")
    const { currUser, userLogout, createPost } = UserAuth()
    const [admin,setAdmin] = useState("")
console.log(category)  
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

    
   verifyAdmin()
   
    
// eslint-disable-next-line
},[currUser])


    const handleUploadBlog = (e) => {
        e.preventDefault()
        const storageRef = ref(storage, `images/${imageUpl.name + v4()}`)

        const uploadTask = uploadBytesResumable(storageRef, imageUpl);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUplProgress('Upload is ' + progress + '% done')   
                  },
            (error) => {
                alert(error.message)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const postcollectionref = collection(db, "posts")
                    const blogObject = {
                        title: blogTitle,
                        content: blogContent,
                        video:video,
                        like:[],
                        dislike:[],
                        breakingNews:breakingNews,
                        category:category,
                        createdOn: Timestamp.now().toDate(),
                        imageUrl: downloadURL,
                        author:{
                            name:"Admin",
                            email:currUser?.email
                        }
                    }

                    createPost(postcollectionref, blogObject)
                        .then(() => {
                            toast("Article added successfully", { type: "success" });
                            setUplProgress("");
                            setBlogTitle("")
                            setBlogContent("")
                            setVideo("")
                            setImageUpl(null)
                            


                       
                        })
                        .catch((err) => {
                            toast("Error adding article", { type: "error" });
                        });
                });
            }
        );
       
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
                        <form onSubmit={handleUploadBlog}>
                            <input type="text" maxLength="100" className=' box-border w-full font-extralight text-[11px] h-[50px] rounded-lg p-4' name="title" placeholder="Enter Title..." value={blogTitle } onChange={(event) => setBlogTitle(event.target.value)} /><br /><br />
                            <input type="file" onChange={(event) => setImageUpl(event.target.files[0])} accept="image/jpeg, image/jpg, image/png"/> <p> {uplProgress } </p>
                            <ToastContainer />
                            <br /><br />
                            <input type="text" className=' box-border w-full h-[50px] font-extralight text-[11px] rounded-lg p-4'  value={video} placeholder="Enter Video Link (Only the video ID)" onChange={(event) => setVideo(event.target.value)} /><br /><br />
                            <textarea className='box-border w-full rounded-lg p-4 font-extralight text-[11px]'  placeholder="Enter Blog Content.." cols="50" rows="10" value={blogContent} onChange={(event) => setBlogContent(event.target.value)} required/>
                            <div className='p-3 my-3 flex justify-start border-slate-800 border-[1px] rounded-lg'>
                              <input type="checkbox" checked={breakingNews} onChange={handleBreaking} /> 
                              <h1 className='text-[10px] px-2 font-semibold'>This is Breaking News</h1>
                            </div>
                                <label for="country"     className='text-[12px] font-bold p-4'>Category</label>
                            <select name="category" value={category} className='w-full h-[30px] p-2 font-extralight text-[11px]' onChange={(event) => setCategory(event.target.value)}>
                                
                                <option hidden>Select Category</option>
                                <option value="Politics">Politics</option>
                                <option value="Sports">Sports</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="World News">World News</option>
                                <option value="Business">Business</option>
                                </select>

                            <button className='my-4 px-5 py-3' >Submit</button>
                                </form>
                </div> 
            </div>
        

           </div> }
    </>    
     
  
  )
}
