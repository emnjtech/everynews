import React,{useState} from 'react'
import { Icon } from '@iconify/react';
import { UserAuth } from './Context/AppState' 
import ProtectedRouteSignIn from './ProtectedRouteSignIn';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

export default function SignIn() {
    
    const { signInWithGoogle,userLogin, userRegister } = UserAuth()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorMsg,setErrorMsg] = useState("")
    const pageNavigate = useNavigate()

    const register = async(e) =>{
        e.preventDefault()
        try{
           await userRegister(email,password)
           .then((userCredentials) =>{
            // const user= userCredentials.user
           })
        }catch(error){
            setErrorMsg(error.message)
        }

    } 

    const handleLogin = async (e) => {
        e.preventDefault()
 
        try {
          await userLogin(email, password);
          toast("Login successful", {
            position: toast.POSITION.TOP_CENTER
        })
          pageNavigate("/")
        }
        catch (error) {
          console.log(error.code)
        }
    
      }


    return (
        <ProtectedRouteSignIn>
            <div className='w-[90%] p-5 mx-auto'>
                <div className='w-full md:w-[50%] mx-auto bg-slate-200 rounded-lg shadow-2xl text-center pt-10'>
                   {errorMsg && <div className='w-full h-[40px] bg-red-500'><h1 className='text-white p-4 text-[11px] font-extralight'>{errorMsg}</h1></div>}
                    <h1 className='text-center font-bold text-slate-500'>Log-in or Register</h1>

                    <p className='p-2 text-[9px]'>For quick testing purpose, kindly login with username: testuser@emnj.tech, password: testuser </p>
                    <form className='px-4 py-1'>
                        <input type="email" onChange={(e) =>setEmail(e.target.value)} className='w-full h-[50px] my-3 p-4 text-[11px] font-extralight' placeholder='Enter your email...'/>
                        <input type="password" onChange={(e) =>setPassword(e.target.value)}  className='w-full h-[50px] p-4 text-[11px] font-extralight' placeholder='Enter your email...'/>
                        <div className='w-full flex justify-between p-4 mt-4'>
                        <button className='font-bold text-blue-500 px-0 py-0 bg-transparent' onClick={register}>Register</button>
                        <button className='font-bold text-blue-500 px-0 py-0 bg-transparent' onClick={handleLogin}>Sign-in</button>
                        
                        </div>
                    </form>

                    <div className='mx-auto w-full px-4 flex justify-center items-center '>
                        <button onClick={signInWithGoogle} className="flex p-2 w-[250px] mb-3 bg-transparent border-2 border-blue-900 my-auto justify-center items-center"  ><Icon icon="flat-color-icons:google" className='text-[40px]' />
                        <h1 className='p-2 text-sm font-bold text-black'>Sign In With Google</h1></button></div>
                </div>
            </div>
        </ProtectedRouteSignIn>
    )
}
