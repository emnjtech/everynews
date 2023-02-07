import React from 'react'
import { Icon } from '@iconify/react';
import {  db } from './admin/firebaseConfig'
import {doc, updateDoc, arrayRemove,arrayUnion } from "firebase/firestore";
import { UserAuth } from './Context/AppState';

export default function LikeComponent({id,likes,likeCount, dislikes, dislikeCount}) {
    const {currUser} = UserAuth()
    const likeRef = doc(db,"posts",id)
const handleLike = () =>{
    if (dislikes?.includes(currUser.email) ||likes?.includes(currUser.email)){
        updateDoc(likeRef,{
            like: arrayRemove(currUser.email)
        }).then(()=>{
            console.log("You unliked")
        })
    }
    else{
        updateDoc(likeRef,{
            like: arrayUnion(currUser.email)
        }).then(()=>{
            console.log("You liked")
        })
    }
}
const handleUnlike = () =>{
    if (dislikes?.includes(currUser.email) ||likes?.includes(currUser.email)){
        updateDoc(likeRef,{
            dislike: arrayRemove(currUser.email)
        }).then(()=>{
            console.log("You unliked")
        })
    }
    else{
        updateDoc(likeRef,{
            dislike: arrayUnion(currUser.email)
        }).then(()=>{
            console.log("You liked")
        })
    }
}


  return (
    <div>
        <div className='w-full flex justify-between items-center'>
                            <div className='flex py-4 justify-start'>
                               <div className='flex justify-start items-center'>
                                   <Icon icon="fluent:thumb-like-24-regular" className='text-3xl' onClick={handleLike}/>
                                   <h1 className=' text-[10px] text-slate-500'>{likeCount}</h1>
                               </div>
                            <div className='flex justify-start items-center mx-3'>
                               <Icon icon="fluent:thumb-dislike-16-regular" className='text-3xl' onClick={handleUnlike}/>
                               <h1 className=' text-[10px] text-slate-500'>{dislikeCount}</h1>
                              </div>
                        </div>


        </div>
    </div>
  )
}
