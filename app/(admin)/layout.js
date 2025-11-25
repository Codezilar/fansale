"use client"
import { redirect } from "next/navigation";
// import AuthNav from "@/components/AuthNav"
import Sidebar from "../../components/Sidebar"
import { useAuth } from '@clerk/nextjs';

const RootLayout = ({children}) => {
  const { userId } = useAuth();
  if(userId != "user_32Pp9tXZmswXchoedVMXjU7IPcW"){
    redirect('/');
  }
  return (
    <div className='auth'>
      <div className="admin">
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default RootLayout