import Link from 'next/link'
import React from 'react'
import { IoTicketSharp } from "react-icons/io5";
import { GiStoneCrafting } from "react-icons/gi";
import { FcDeleteDatabase } from "react-icons/fc";

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-container">
            <div className="auth-logo">
                <h1>fan<span>SALE</span></h1>
            </div>
            <div className="sidebar-content">
                <Link href={''} ><span><IoTicketSharp className='text-2xl font-extrabold text-yellow-600' /><p>Tickets</p></span></Link>
                <Link href={''} ><span><GiStoneCrafting className='text-2xl font-extrabold text-yellow-600' /><p>Create Tickets</p></span></Link>
                <Link href={''} ><span><FcDeleteDatabase className='text-2xl font-extrabold text-yellow-600' /><p>Delete Tickets</p></span></Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebar