// import AuthNav from "@/components/AuthNav"
import Sidebar from "../../components/Sidebar"
import Link from "next/link"
import { ReactNode } from "react"

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