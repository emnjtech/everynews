import React from 'react'
import { Icon } from '@iconify/react';



//import emailjs from 'emailjs-com'
import 'react-toastify/dist/ReactToastify.css';



export default function Footer() {

 

   /* const onSubmit = (e) => {
        e.preventDefault();
        if (toSend.message.trim().length === 0 || toSend.from_name.trim().length === 0 || toSend.subject.trim().length === 0) {
            toast('No field should be left empty');
            return
        }
    } */
    return (
        <div className="w-full md:w-full  bg-slate-300 px-7 mt-[100px] py-8" >
            <div className=' md:flex justify-between   px-4 w-full '>

                <div className='mt-8'>
                    <h1 className='   font-bold text-sm text-slate-500'>Connect with Developer</h1>

                    <div className='flex md:flex justify-start  '>
                            <a href="https://github.com/emnjtech/" rel="noreferrer" target="_blank"><Icon icon="ri:github-fill" /></a>
                            <a href="www.linkedin.com/in/themartinzjr" rel="noreferrer" target="_blank"><Icon icon="ri:linkedin-box-fill" /></a>
                            <a href="https://emnj.tech" rel="noreferrer" target="_blank"><Icon icon="carbon:logo-twitter" /> </a>

                    </div>
                    <h1 className=' font-bold text-sm text-white'> <a href="https://emnj.tech" target="_blank" rel="noreferrer">About Developer</a></h1>


                </div>

                   
               



            </div>



        </div>
    )
}
