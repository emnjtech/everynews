
import AppContext from "./AppContext";
import React from 'react'
import { useContext, useEffect, useState } from "react";
import {signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth,provider } from "../admin/firebaseConfig";
import { db } from "../admin/firebaseConfig";
import { addDoc, deleteDoc, setDoc } from "firebase/firestore";
import { getDocs} from 'firebase/firestore'


export default function AppState({ children }) {
    const [currUser, setCurrUser] = useState({})
    const [currAdmin, setCurrAdmin] = useState({})
 /*   const [editRecords, setEditRecords] = useState("")


    useEffect(() => {
        const forEdits = setEditRecords(records)
        return forEdits 
        
    }, [])

  */


    const userLogin = (email,password) => {
        return signInWithEmailAndPassword (auth,email,password)
    }
    const userRegister = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const deletePost = (postDoc, Id) => {
        return deleteDoc(postDoc, Id)
    }

    
    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider)
         /*   .then((result) => {
                localStorage.setItem('USER_INFORMATION', JSON.stringify(result.user.displayName));
                window.location.reload(true)
                   
                })       
            .catch((error) => {
                alert(error)
            }) */
    }  



    const userLogout = () => {
     return signOut(auth)
    }

 
    const createPost = (postcollectionref, dbObject) => {
        return addDoc (postcollectionref,dbObject)
    }
    const updatePost = (postcollectionref, dbObject) => {
        return setDoc(postcollectionref,dbObject)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setCurrUser(currentuser)
        })
        return () => {
            unsubscribe()
        }
    }, [])




  return (
      <AppContext.Provider value={{ 
        userLogin, 
        userLogout, 
        currUser, 
        createPost, 
        deletePost,
        signInWithGoogle,
        updatePost,
        userRegister}}>
          
          {children}
   </AppContext.Provider>
  )
}
export const UserAuth = () => {
    return useContext(AppContext)
}