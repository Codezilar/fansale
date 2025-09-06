import Link from 'next/link'
import React from 'react'

const SecondFooter = () => {
  return (
    <div className='SecondFooter'>
        <div className="SecondFooter-container"> 
            <h1>About Us</h1>       
            <ul>
                <Link href={""}><li>Contact</li></Link>
                <Link href={""}><li>More Information</li></Link>
                <Link href={""}><li>Contact</li></Link>
            </ul>
        </div>
        <div className="SecondFooter-container"> 
            <h1>Help</h1>       
            <ul>
                <Link href={""}><li>Purchaser FAQs</li></Link>
                <Link href={""}><li>Seller FAQs</li></Link>
            </ul>
        </div>
        <div className="SecondFooter-container"> 
            <h1>Payment methods</h1>       
           <span></span>
        </div>
    </div>
  )
}

export default SecondFooter