import React from 'react'

const EnterEmail = () => {
  return (
    <div className="login-container">
        <div className="login-left">
          <h1>Log in or Create an Account</h1>
        </div>
        <div className="login-right">
          <h3>Please enter your email address</h3>
          <div className="login-input">
            <p>Email Address</p>
            <input type="text" />
          </div>
          <button>Continue</button>
        </div>
    </div>
  )
}

export default EnterEmail