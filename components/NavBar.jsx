"use client"
import Link from 'next/link';
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { SignedOut, UserButton } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';


const NavBar = () => {
  const { userId } = useAuth();
  return (
    <div className='nav'>
      <div className='nav-container'>
          <div className="nav-logo">
            <div className='jhgbduhjssjd'>
              <Link href={'/'}>
                <h1>fan<span>SALE</span></h1>
              </Link>
                <div className="mobile-nav">
                    <button className='Header-Button'>
                      <span>
                        <p><FaSearch className='text-white text-2xl' /></p>
                      </span>
                    </button>
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
        <div className="nav-search">
          <input type="seaech" placeholder='Search for event, artist, location' />
          <FaSearch className='text-black text-2xl' />
        </div>
        <div className="btns">
            <Link href={'/sell_tickets'} className='flex w-full'>
              <button className='Header-Button'>
                <span>
                  <p>Sell</p>
                </span>
              </button>
            </Link>
            {userId === "user_32Pp9tXZmswXchoedVMXjU7IPcW" &&(
              <Link href={'/tickets'} className='flex w-full'>
              <button className='Header-Button'>
                <span>
                  <p>Dashboard</p>
                </span>
              </button>
            </Link>
            )}
            <SignedOut>
              <Link href={'/login'} className='flex w-full'>
                <button className='Header-Button'>
                  <span>
                    <p>Login</p>
                  </span>
                </button>
              </Link>
            </SignedOut>
            <button className='Header-Button menuHead'>
              <span>
                <FaBars />
                <p>Menu</p>
              </span>
            </button>
            <UserButton />
        </div>
      </div>
    </div>
  )
}

export default NavBar