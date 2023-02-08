import React from 'react'
import error from './assets/error1.png'
import {Link} from 'react-router-dom'
import { UserAuth } from './Context/AppState'
import { useNavigate } from 'react-router-dom'

export default function PageNotFound() {
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
          <h1 className='text-[12px] text-center px-4 text-slate-600'>
              <Link to="/" className='font-bold text-blue-500' >Go home</Link> before it gets dark. </h1>
          
          

      </div>

  )
}
