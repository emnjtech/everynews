import React, { useState } from 'react'
import './adminLogin.css'
import { UserAuth } from '../Context/AppState'
import {useNavigate} from 'react-router-dom'


export default function AdminLogin() {
  const pageNavigate  = useNavigate()
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPass, setLoginPass] = useState("")
  const { userLogin,currUser } = UserAuth()
  const [error, setError] = useState("")
  const [admin,setAdmin] = useState("")
  let errorMessage = error


  


  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await userLogin(loginEmail, loginPass);
      pageNavigate("/createArticle")
    }
    catch (e) {
      setError(e.message)
      
  
    }

  }
  return (

    <div className="login-wrap">
      <p>{errorMessage}</p>
      <div className="login-html">
        <form onSubmit={handleLogin}>
          <input id="tab-1" type="radio" name="tab" className="sign-in" checked /><label for="tab-1" className="tab">Admin Sign In</label>
          
          <input id="tab-2" type="radio" name="tab" className="sign-up"/><label for="tab-2" className="tab"></label>
            <div className="login-form">
              <div className="sign-in-htm">
            <div className="group">
            
                <label for="user" className="label">E-mail</label>
              
                  <input id="user" type="text" className="input" onChange={(event) => setLoginEmail(event.target.value)}/>
                </div>
                <div className="group">
                  <label for="pass" className="label">Password</label>
              <input id="pass" type="password" className="input" data-type="password" onChange={(event) => setLoginPass(event.target.value)}/>
                </div>
                <div className="group">
                  <input id="check" type="checkbox" className="check" checked/>
                    <label for="check"><span className="icon"></span> Keep me Signed in</label>
                </div>
              <div className="group">
                
                <button class="button" >Sign In</button>
                </div>
                <div className="hr"></div>
                <div className="foot-lnk">
                  <a href="#forgot">Forgot Password?</a>
                </div>
          </div>
        
              
          </div>
          </form>
      </div>
      </div>


  )
}
