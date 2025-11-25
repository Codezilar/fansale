import Link from 'next/link'
import React from 'react'
import { FaCircle } from "react-icons/fa";

const EnterPassword = () => {
  return (
    <div className="login-container">
        <div className="login-left">
          <h1>Welcome!</h1>
        </div>
        <div className="login-right">
          <h3>Set a password to create your account</h3>
          <span>
            <p>zoeehime@gmail.com</p>
            <Link href={''} className='text-sm text-[#139DF4] underline' >Use a different email address</Link>
          </span>
          <div className="login-input">
            <p>Password</p>
            <input type="text" />
            <ul>
                <span><FaCircle className='text-gray-400' /> <p>min. 8 characters</p></span>
                <span><FaCircle className='text-gray-400' /> <p>Uppercase and lowercase letters</p></span>
                <span><FaCircle className='text-gray-400' /> <p>Numbers and special characters</p></span>
            </ul>
          </div>
          <button>Register</button>
          <p>I would like to register with eventim.co.uk as a new customer. I agree that EVENTIM UK is allowed to process my personal data. You can revoke your consent at any time</p>
          <p className='mt-3'>VENTIM places great importance on data protection. You can read the data protection statemen.</p>
          <hr />
          <button className='reg-pass'>Register Without Password</button>
          <p className='mt-3'>Please note that with fast registration, you can only place one order with this email address. However, you can transfer the email address used here to a customer account at any time.</p>
        </div>
    </div>
  )
}

export default EnterPassword