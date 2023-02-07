import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { UserAuth } from './Context/AppState';
import { doc } from 'firebase/firestore';
import { db } from './admin/firebaseConfig'
import { useParams,useNavigate, useLocation} from 'react-router-dom';


export default function PopUp() {
    const navigate = useNavigate()
    const { currUser, deletePost, } = UserAuth()
    const location = useLocation()
    const popItems = location.state

    useEffect(() =>{
        const checkAuthor = ()=>{
            if(!popItems?.author){
                navigate('/')
            }
        }

        checkAuthor()
    },[])


    const {id} = useParams()
    
    const handleReturn =()=>{
        navigate(-1)
    }

    const handleDelete = async () => {
        const postDoc = doc(db, 'posts', id)
        try {
          await deletePost(postDoc)
          toast("has been successfully deleted")
          navigate(-1)
        }
        catch (error) {
         toast(error.message)
        }
      }
  return (
    <div className='w-full py-4 flex justify-start h-screen mb-5 bg-black opacity-60 absolute top-11 z-20'>
        <div className='w-[300px] h-[300px] p-8 bg-white mx-auto my-auto rounded-3xl opacity-100'>
            <h1 className='text-sm'>Are you sure you want to delete </h1>
            <h1 className=' text-yellow-600 font-bold text-sm'>{popItems && popItems.title}</h1>
            <div className='py-4'><button onClick={handleDelete} className='w-full bg-green-600'>Delete</button></div>
            <div className='py-4'><button onClick={handleReturn} className='w-full  bg-red-600'>Return</button></div>
            

        </div>
        
        
    </div>
  )
}
