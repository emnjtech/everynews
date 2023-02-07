import React,{useEffect,useState} from 'react'
import { useNavigate, useLocation} from 'react-router-dom';
import { storage} from './admin/firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL,deleteObject } from 'firebase/storage'
import {v4} from 'uuid'

export default function UpdateImage() {
    const navigate = useNavigate()
    const location = useLocation()
    const popItems = location.state
    const [imageUpl, setImageUpl] = useState(null)
    const [imageUrl, setImageUrl] =useState('')
    const [uplProgress,setUplProgress] =useState('')
console.log(popItems.imgLink)
    useEffect(() =>{
        const checkAuthor = ()=>{
            if(!popItems?.author){
                navigate('/')
            }
        }

        checkAuthor()
       // eslint-disable-next-line
    },[])

    
    const handleReturn =()=>{
        navigate(-1)
    }
    const handleUploadImage = (e) => {
        e.preventDefault()
        setImageUpl(e.target.files[0])
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
                    setImageUrl(downloadURL)
                    })
            }
        );
       
    }
  

    function updateImage(){
        if(imageUrl !==""){
            const desertRef = ref(storage, popItems?.imgLink)
            deleteObject(desertRef).then(() => {
                console.log("Delete successful")
              }).catch((error) => {
                console.log(error)
              });
            navigate(`/EditArticle/${popItems.id}`,{state:imageUrl})
        }
      

    }

    return (
    <div className='w-full py-4 flex justify-start h-screen mb-5 bg-black opacity-60 absolute top-11 z-20'>
    <div className='md:w-[400px] w-full p-8 bg-white mx-auto my-auto rounded-3xl opacity-100'>
        <h1 className='text-sm text-center font-bold'>Update Image </h1><hr/>
       

       <div className='flex items-center justify-center'> <input type="file" className=" rounded-lg text-sm my-6"  onChange={handleUploadImage}/>
       
       
       </div>
       <div className='flex items-center justify-center'> <img src={imageUrl} className='w-[200px] rounded-3xl' alt={imageUrl} /></div>
        <h1 className='text-[8px] font-bold text-slate-500 text-center'>{uplProgress}</h1>
        
       {imageUrl !== "" && <div className='py-4'><button onClick={updateImage}  className='w-full rounded-full py-3 bg-black text-sm'>Update Image</button></div>}
        <div className='py-4'><button  onClick={handleReturn} className='w-full p-3 text-sm rounded-full  bg-black'>Return</button></div>
    </div>
    
    
</div>
  )
}
