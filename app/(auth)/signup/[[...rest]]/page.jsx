import { SignUp } from '@clerk/nextjs'
// import EnterEmail from '../../../../components/EnterEmail'
// import EnterPassword from '../../../../components/EnterPassword'
import React from 'react'

const page = () => {
  return (
    <div className='login'>
      {/* <EnterEmail /> */}
      {/* <EnterPassword /> */}
      <SignUp />
    </div>
  )
}

export default page