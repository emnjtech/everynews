import React from 'react'
import { Icon } from '@iconify/react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'


export default function TopNav() {

  

  const [mobileNav, setMobileNav] =useState(false)
  const [searchBox,setSearchBox] = useState("")

  return (
    <div>TopNav</div>
  )
}
