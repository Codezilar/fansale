import React from 'react'
import { GiStoneCrafting } from "react-icons/gi";

const page = () => {
  return (
    <div className='dash'>
      <div className="dash-top">
       <span><GiStoneCrafting className='text-2xl font-extrabold text-yellow-600' /><p>Create Ticket</p></span>
      </div>
      <div className="dash-container">
        <form className="dash-content">
            <div className="labels">
              <div className="label">
                <h2>Artist Name:</h2>
                <input type="text" placeholder='John Doe' />
              </div>
              <div className="label">
                <h2>Location Desc and other info:</h2>
                <input type="text" placeholder='Monday, July 7, 2025, 9:00 PM...' />
              </div>
            </div>
            <div className="labels">
              <div className="label">
                <h2>Number of Tickets:</h2>
                <input type="number" placeholder='1' />
              </div>
              <div className="label">
                <h2>Price</h2>
                <input type="number" placeholder='£100' />
              </div>
            </div>
            <div className="labels">
              <div className="label">
                <h2>Artist Image:</h2>
                <input type="file" />
              </div>
            </div>
            <button>Create Ticket</button>
        </form>
      </div>
    </div>
  )
}

export default page