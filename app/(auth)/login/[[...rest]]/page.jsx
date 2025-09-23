import { SignIn } from '@clerk/nextjs'
// import EnterEmail from '../../../../components/EnterEmail'
// import EnterPassword from '../../../../components/EnterPassword'
import React from 'react'

const page = () => {
  return (
    <div className='login'>
      {/* <EnterEmail /> */}
      {/* <EnterPassword /> */}
      <SignIn />
    </div>
  )
}

export default page