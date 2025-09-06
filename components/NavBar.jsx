import Link from 'next/link';
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

const NavBar = () => {
  return (
    <div className='nav'>
      <div className='nav-container'>
        <Link href={'/'}>
          <div className="nav-logo">
            <div className='jhgbduhjssjd'>
              <h1>fan<span>SALE</span></h1>
                <div className="mobile-nav">
                  <Link href={'/sell_tickets'} className='flex w-full'>
                    <button className='Header-Button'>
                      <span>
                        <p>Sell</p>
                      </span>
                    </button>
                  </Link>
                  <button className='Header-Button'>
                    <span>
                      <FaBars />
                      <p>Menu</p>
                    </span>
                  </button>
                </div>
            </div>
            <div className="logo-text">
              <p>Fan First Thinking</p>
              <p className='-mt-1'>Fro Eventim UK</p>
            </div>
          </div>
        </Link>
        <div className="nav-search">
          <input type="seaech" placeholder='Search for event, artist, location' />
          <FaSearch className='text-black text-2xl' />
        </div>
        <div className="btns">
            <button className='Header-Button'>
              <span>
                <p>Sell</p>
              </span>
            </button>
            <button className='Header-Button'>
              <span>
                <p>Login</p>
              </span>
            </button>
          <button className='Header-Button menuHead'>
            <span>
              <FaBars />
              <p>Menu</p>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NavBar