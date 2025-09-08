"use client"
// import AuthNav from "@/components/AuthNav"
import Sidebar from "../../components/Sidebar"

const RootLayout = ({children}) => {
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