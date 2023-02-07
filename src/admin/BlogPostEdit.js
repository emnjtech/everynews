import React from 'react'
import './profile.css'
import ProtectedRoute from '../ProtectedRoute'
import { useNavigate, useParams } from 'react-router-dom'
import { UserAuth } from '../Context/AppState' 
import { useState } from 'react'
import { db } from './firebaseConfig'
import { doc, collection,updateDoc, Timestamp} from 'firebase/firestore'
import editRecords from '../Article'


export default function BlogPostEdit() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [blogTitle, setBlogTitle] = useState("")
    const [category, setCategory] = useState("React Js")
    const [blogContent, setBlogContent] = useState("")
    const [video, setVideo] = useState("")

    const updateDocument = async (id, title,content,imageUrl,video,createdOn,author,category) => {
        const upUser = doc(db, "posts", id)
        const upDateField = {
            title: blogTitle,
            content: blogContent,
            video,
            createdOn: Timestamp.now().toDate(),
            category,
            author: {
                name: "Martinz Nnaji Jr."
            }

        }
        await updateDoc(upUser, upDateField)
    }
 
 


    const { currUser, userLogout,createPost } = UserAuth()
    const postcollectionref = collection(db, "posts")

 const blogObjects = {
        title: blogTitle,
        content: blogContent,
       video,
        category,
        author: {
            name: "Martinz Nnaji Jr."
            
        }
    } 
   
    const createBlogPost = async (e) => {
        try {
            e.preventDefault()
            await createPost(postcollectionref, blogObjects)
            setBlogTitle("")
         //   navigate('/')
            
            

        }
        catch (error) {
            console.log(error.message)
        }
        
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
        <ProtectedRoute>
            <div className="profile--justify">
                <div className='mycard'>
                    <div className='cardImage'>
                        <div className='cardImageProfile'>

                        <img alt="profilePic" src='https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=780&q=80' />
                        
                    </div>
                        <div className='profileName'><h5>{currUser && "Martinz Nnaji Jr"}</h5></div>
                    </div>
                                          
                    
                    <button className='button' onClick={logout}>SIGN OUT</button>
                    
                </div>
            
                <div className='createBlog'>
                    <h3>Edit Blog Content</h3>
                <div>
                        <form onSubmit={createBlogPost}>
                            
                        
                            <input type="text" id="title" name="title" placeholder="Enter Title..." value={editRecords.title} onChange={(event) => setBlogTitle(event.target.value)} /><br /><br />
                          
                            <input type="file" id="myFile" name="filename" className='button2'/><br/><br/>
                
                            <input type="text" id="Video-link" name="videoLink" placeholder="Enter Video Link (Only the video ID)" value={editRecords.video} onChange={(event) => setVideo(event.target.value)} required/><br /><br />

                
                            <textarea id="blogPost" placeholder="Enter Blog Content.." cols="50" rows="10" defaultValue={editRecords.post} onChange={(event) => setBlogContent(event.target.value)} required/>

                                <label for="country">Category</label>
                            <select id="country" name="category" value={category} onChange={(event) => setCategory(event.target.value)}>
                                    
                                <option value="React Js">React Js</option>
                                <option value="webDesign">Web Design</option>
                                <option value="Database">Database</option>
                                </select>

                            <button className=' button' >SUBMIT </button>
                                </form>
                            </div>
            </div>
        

           </div>
            
      </ProtectedRoute>
  
  )
}
