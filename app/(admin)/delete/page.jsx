import React from 'react'
import { IoTicketSharp } from "react-icons/io5";
import { IoCopy } from "react-icons/io5";
import { FcDeleteDatabase } from "react-icons/fc";
const page = () => {
  return (
    <div className='dash'>
      <div className="dash-top">
       <span><FcDeleteDatabase className='text-2xl font-extrabold text-yellow-600' /><p>Delete</p></span>
      </div>
      <div className="tickets_admin">
        <div className="tickets_admin-container">
          <div className="tickets_admin-top ticket_delete">
            <h1>Artist</h1>
            <h1>Desc</h1>
            <h1 className='text-center'>Num Ticket</h1>
            <h1>Share</h1>
          </div>
          <div className="tickets_admin-top ticket_delete artist-manage">
            <h1>BurnaBoy</h1>
            <h1>Monday, July 7, 2025, 9:00 PM, Stadio Euganeo, 35100 PADOVA</h1>
            <h1 className='text-center'>1</h1>
            <button><p>Delete</p><FcDeleteDatabase /></button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default page