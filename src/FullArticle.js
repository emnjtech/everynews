import React,{useState, useEffect} from 'react'
import { useNavigate, useParams,Link } from 'react-router-dom'
import {  db } from './admin/firebaseConfig'
import { getDocs, 
    doc, 
    onSnapshot,
    where,limit,collection, 
    Timestamp, arrayUnion, 
    arrayRemove, updateDoc, query  } from "firebase/firestore";
import ReactTimeAgo from 'react-time-ago'
import Article from './Article';
import { Icon } from '@iconify/react';
import { UserAuth } from './Context/AppState';
import LikeComponent from './LikeComponent';
import CommentComponent from './CommentComponent';
import { v4 } from 'uuid';

export default function FullArticle() {
    const { id } = useParams()
    const [article, setArticle] = useState("");
    const [suggestions,setSuggestions] = useState("")
    const [commentInput, setCommentInput] = useState('')
    const navigate = useNavigate()
    const commentRef = doc(db, 'posts',id)
   
    useEffect(() => {
        const getFullArticle = ()=>{
            const docRef = doc(db, "posts", id);
            onSnapshot(docRef, (snapshot) => {
                setArticle({ ...snapshot.data(), id: snapshot.id });
               
            });
        }

        


     getFullArticle()
    
    }, []);

    useEffect(()=>{
        const getSuggestions = async () => {
            const newQuery = query(collection(db, "posts"), where("category","==",article?.category),where("title", "!=",article?.title), limit(4))
            const data = await getDocs(newQuery)
            setSuggestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          }
          getSuggestions()
    },[article])


    console.log(article)

    const clickDelete = ()=>{
        navigate(`/delete/${id}`, {state:{author:article?.author.email, title:article.title}})
    
      }  
      const { currUser } = UserAuth()

 const handleAddComment =(e)=>{
    e.preventDefault()
    
    updateDoc (commentRef,{
       
        comments:arrayUnion({user: currUser.email,
        comment: commentInput,
        createdAt: Timestamp.now().toDate(),
        commentId: v4(),
      })}).then(()=>{
        setCommentInput("")
        console.log("Comment added")
        
      })
    

 }

 const handleDeleteComment = (comment)=>{
    updateDoc (commentRef,{
        comments:arrayRemove(comment)})
        .then(()=>{
        console.log("Comment deleted")
        
      })
    
 }

    return (
    <>
        {article && <div className="w-[90%] mx-auto md:flex justify-between">
            <div className="md:w-[70%] p-4">  
             <div >
                        <div className="w-full mt-8 mb-4">
                        <h2 className=' text-2xl font-bold'>{article.title}</h2>
                   
                            <img src={article.imageUrl} className='w-full'/>
                            </div>
                            <div className=' py-1 flex justify-between items-center'>
                             <h1 className='text-[10px]  px-1 text-slate-400'>By {article.author.name} - Created:<ReactTimeAgo date={article.createdOn.toDate().toString()} locale="en-US"/> - {article.category}</h1>
                             {currUser?.email === article.author.email? 
                             <div className=' flex justify-center  top-0 mt-2 mx-2 shadow-2xl shadow-slate-600 right-[0px] rounded-full p-2'>
                  <div className='flex justify-center items-center px-3 '><Icon icon="material-symbols:delete-outline"  onClick={clickDelete} className="cursor-pointer" fontSize='21px' color='blue'/><h1 className='text-[8px]'>Delete</h1> </div>
                  <Link to={`/editArticle/${id}`}><div className='flex justify-center items-center'><Icon icon="material-symbols:edit-document-outline-sharp" fontSize='20px' color="blue" /><h1 className='text-[8px]'>Edit</h1></div></Link>
            </div>: ""}
                  
                              </div>
                       
                        <div className=" mb-2 pb-2">
                          
                            <p className='text-sm text-justify'>{article.content}</p>
                               
                        </div>
        
                        <div>
                            <LikeComponent
                            id ={article.id}
                            likes={article.like}
                            likeCount={article.like.length}
                            dislikes={article.dislike}
                            dislikeCount={article.dislike.length}
                             />
                        </div>
                {currUser ?
                        <div className='md:flex md:justify-between md:items-center mb-5'>
                            <input type='text' className='w-[85%] h-[80px] border-gray-300 border-2 outline-none rounded-2xl text-[10px] p-4' placeholder="write comment..." value={commentInput} onChange={(e)=>setCommentInput(e.target.value)}/>
                            <button onClick={handleAddComment} className='bg-green-400 my-2 flex justify-center items-center px-3'><Icon icon="ri:send-plane-fill" /><h1 className='text-sm'>Send</h1></button>
                        </div>
                       : <div className='flex text-[9px] my-2'> <h1>
                       <Link to='/login'><b className='text-blue-600'>Login </b>or 
                       <b className='text-blue-600'> register </b> </Link></h1> <h1 className='px-1'> to like or comment</h1></div>
                }
                       {article.comments && article.comments?.map(({user,comment,createdAt,commentId}) =>(
                        <div>
                            <CommentComponent
                            id = {commentId}
                            comments ={comment}
                            date={createdAt}
                            user={user}
                            deleteComment={() =>handleDeleteComment({user,commentId,createdAt,comment})}
                            
                            />


                        </div> 
                       )) }
           
                </div>


            </div>

                <div className='p-4 md:w-[30%]'>
                    <h1 className='font-bold text-center'>RELATED NEWS</h1>
                    {suggestions && suggestions?.map((item)=>(
                        <Article 
                        title={item.title}
                        content={item.content}
                        image={item.imageUrl}
                        author={item.name}
                        createdOn={item.createdOn}
                        />

                    ))
                    }
                    
                </div>
                </div>
                     
           
            }
    </>
  )
  
}
