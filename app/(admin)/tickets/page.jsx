import React from 'react'
import { IoTicketSharp } from "react-icons/io5";
import { GiStoneCrafting } from "react-icons/gi";
import { FcDeleteDatabase } from "react-icons/fc";

const page = () => {
  return (
    <div className='dash'>
      <div className="dash-top">
       <span><IoTicketSharp className='text-2xl font-extrabold text-yellow-600' /><p>Tickets</p></span>
      </div>
      <div className="dash-container">
        <form className="dash-content">
            <div className="labels">
              <div className="label">
                <h2>Arrtist Name</h2>
                <input type="text" />
              </div>
              <div className="label">
                <h2>Location Desc and other info:</h2>
                <input type="text" />
              </div>
            </div>
            <div className="labels">
              <div className="label">
                <h2>Number of Tickets:</h2>
                <input type="number" />
              </div>
              <div className="label">
                <h2>Price</h2>
                <input type="number" />
              </div>
            </div>
            <div className="labels">
              <div className="label">
                <h2>Artist Image:</h2>
                <input type="text" />
              </div>
              <div className="label">
                <h2>Price</h2>
                <input type="text" />
              </div>
            </div>
        </form>
      </div>
    </div>
  )
}

export default page