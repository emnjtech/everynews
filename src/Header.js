import React from 'react'
import { Icon } from '@iconify/react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { UserAuth } from './Context/AppState';


export default function Header() {

 

  
 const {currUser,userLogout} = UserAuth()
  const [mobileNav, setMobileNav] =useState(false)
  const [userNav, setUserNav] =useState(false)
  const [searchBox,setSearchBox] = useState("")
  const [search,setSearch] = useState(false)
  const navigate = useNavigate()
  
 function handleSearch(){
  if(searchBox.trim().length !== 0){
    navigate ("/search-results", {state: searchBox})
    setSearch(false)
  }

 }
function revealSearchBar(){
  setSearch(!search)
}
 const logout = async () => {
  try {
      await userLogout()
      navigate('/')
      setUserNav(false)
      console.log("youlogged out")
  }
  catch (e) {
      alert(e.message)
  }


}

  function revealNav(){
    setMobileNav(!mobileNav)
  }


  return (
<>
    
         {search && <div className='bg-black opacity-80 w-full h-screen absolute z-20 bounce-in-top '>

         
          <div className='ml-auto p-4 w-full'>
          <Icon icon="ph:x-circle-bold" className='text-white text-4xl' onClick={revealSearchBar}/>

          </div>

         
        

         <div className=' h-screen p-8'>
         <Link to='/'>
             <div className=' h-[150px] px-2 flex  justify-center  items-center'>
        
               <Icon icon="noto:rolled-up-newspaper"  className=' font-bold text-6xl  text-yellow-600'/>
               <h1 className='text-lg md:text-2xl font-bold  text-red-500'>TheNewsNG</h1>
             </div>
          </Link>
          <div className=' w-full h-[70px] mx-auto my-auto opacity-100 rounded-full bg-white flex justify-between items-center bounce-in-top'>
            
            <input type='text' className='px-8 w-[90%] h-[50px] outline-none opacity-100 rounded-full'
             onKeyDown={(e) =>{
              if(e.key === "Enter"){
                handleSearch()
              }
            }}

            value={searchBox}
            onChange={(e)=>setSearchBox(e.target.value)}

            placeholder='News Search...'
            
            />
            <Icon icon="el:search-alt" className='text-black text-7xl px-2 cursor-pointer' onClick={handleSearch}/>

          </div>
        </div>
      
         </div>} 
    <div className=' w-full h-[90px] shadow-2xl bg-black '>

        <div className='px-4 flex md:justify-between justify-start items-center h-full w-full'>
        <div className='text-white p-2 md:hidden'>
            <Icon icon={!mobileNav? "dashicons:menu-alt3" : "akar-icons:circle-x-fill"} onClick={revealNav} 
            className="text-2xl"/>
        </div>
        <div className='flex h-full px-2 md:hidden mx-auto justify-center  items-center'>
        
               <Icon icon="noto:rolled-up-newspaper"  className=' font-bold text-5xl  text-yellow-400'/>
               <h1 className='text-[14px] md:text-2xl font-bold  text-red-500'>TheNewsNG</h1>
        </div>

        <Link to='/'>
             <div className=' hidden h-[150px] px-2 md:flex  justify-center  items-center'>
        
               <Icon icon="noto:rolled-up-newspaper"  className=' font-bold text-6xl  '/>
               <h1 className='text-lg md:text-lg font-semibold  text-red-500'>TheNewsNG</h1>
             </div>
          </Link>


        <div className='hidden md:flex mx-auto '>
        <ul className='hidden md:flex justify-center items-center  text-[12px] font-bold text-white '>
                      <Link to='/politics'> <li>Politics</li></Link>
                      <Link to='/sports'>  <li>Sports</li></Link>
                      <Link to='/world-news'>  <li>World</li></Link>
                      <Link to='/entertainment'> <li>Entertainment</li></Link>
                      <Link to='/business'>  <li>Business</li></Link>
                        <li>Banking</li>
                        
                          
                        </ul>  
        </div>

      

       
      <div className='h-full flex justify-between items-center ' >
       
        
        <div className='px-2 flex items-center cursor-pointer'>

              <Icon icon="el:search-alt" className='text-3xl text-yellow-400' onClick={revealSearchBar}/>
              <h1 className='text-yellow-400 text-[9px] md:block hidden font-semibold px-1'>Search</h1>

         </div>
                  {!currUser && 
                <Link to='/signIn'>
                 <div className='flex items-center'>
                  
                         <div className='relative'>
                            <Icon icon="ph:user-circle-plus-duotone" className='text-4xl text-yellow-400' />
                         </div>
                         <div>
                           <h1 className='text-[9px] text-yellow-400 md:block hidden font-semibold'>Log in</h1>
                         </div>
                   
                 </div>
                </Link>

                  }
        
           
          {currUser && 
          <div className='h-full flex justify-center items-center ' >
                        
                        
       
                        <div className='relative' onClick={()=>setUserNav(!userNav)}>
                           <Icon icon={!userNav? "mdi:user-circle":"mdi:user-details"} className='text-4xl text-yellow-400' />
                        </div>
                        <div>
                           <h1 className='text-[9px] hidden md:block text-yellow-400 font-semibold'>My account</h1>
                    
                         </div>
          
          </div> }
          </div>
              <div>
              {userNav? <div className='absolute text-center z-10 right-5 bg-blue-700 w-auto rounded-b-full h-auto pb-[20px] mt-8 px-6 text-sm  text-white '>
              <h1 >WELCOME</h1>
              
              <h1 className='font-bold text-[9px] '>{currUser?.email}</h1>
              <hr/>
                      <h1 className='font-bold text-yellow-400 p-4 cursor-pointer' onClick={logout}>Sign Out</h1>
                      
               </div>:""}

        </div>
          
          
        
                  
        


        </div>

        

        <div>
              {mobileNav? <ul className='absolute z-10 left-0 hover:text-slate-400 bg-black w-auto rounded-b-full h-auto pb-20 px-6 text-sm  text-white md:hidden '>
              <Link to='/politics'> <li>Politics</li></Link>
                      <Link to='/sports'>  <li>Sports</li></Link>
                      <Link to='/world-news'>  <li>World</li></Link>
                      <Link to='/entertainment'> <li>Entertainment</li></Link>
                      <Link to='/business'>  <li>Business</li></Link>
                        <li>Banking</li>
               </ul>:""}

        </div>
    </div>


    </>    
  )
}
