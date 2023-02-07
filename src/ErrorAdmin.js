import React from 'react'
import error from './assets/error1.png'
import {Link} from 'react-router-dom'
import { UserAuth } from './Context/AppState'
import { useNavigate } from 'react-router-dom'

export default function ErrorAdmin() {
    const { currUser, userLogout } = UserAuth()
    const navigate = useNavigate()

    const logout = async () => {
        try {
            await userLogout()
            navigate('/adminLogin')
            console.log("youlogged out")
        }
        catch (e) {
            alert(e.message)
        }


    }

  return (
      <div className='md:w-full  mx-auto bg-slate-200 w-full rounded-2xl pb-10 mb-8 md:mb-8'>
          <div className='w-full p-auto justify-center'>
              <img src={error} className=' mx-auto w-[400px]' alt='error 404' />
          </div>
          <h1 className='text-lg font-bold text-center text-slate-500'> You shouldn't be here.</h1>
          <h1 className='text-[12px] text-center px-4 text-slate-600'>You are either trying to visit a page you're not suppose to or your admin access has expired. <br/>
              <Link to="/" className='font-bold text-blue-500' >Go back Home</Link> </h1>
          {currUser && <div className='flex items-center justify-center text-[12px]'> 
          <button className='font-bold text-blue-500 px-0 py-0 bg-transparent' onClick={logout}>Admin Sign-in</button></div> }
          

      </div>

  )
}
