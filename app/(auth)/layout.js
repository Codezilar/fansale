import AuthNav from "../../components/AuthNav"
import Link from "next/link"
import { ReactNode } from "react"

const RootLayout = ({children}) => {
  return (
    <div className='auth'>
        <AuthNav />
            {children}
            <div className="authNav">
                <div className="authNav-left">
                    <Link href={''}>
                        <p>
                            Terms & Conditions
                        </p>
                    </Link>
                    <Link href={''}>
                        <p>
                            Data Protections
                        </p>
                    </Link>
                    <Link href={''}>
                        <p>
                            Imprint
                        </p>
                    </Link>
                    <Link href={''}>
                        <p>
                            Cancellation
                        </p>
                    </Link>
                </div>
                <div className="authNav-right">
                    <div className="authNav-right-top">
                        <p>Customer Hotline</p>
                        <p className="font-extrabold">0333 344 6250</p>
                    </div>
                    <p>
                        Monday - Friday 9:00a.m. to 8:00p.m. <br />
                        Saturday -Sunday 10:00a.m. to 4:00p.m
                    </p>
                    <p>
                        Calls to this number cost no more than a national rate call to an 01 or 02 number and count towards any inclusive minutes you may have in the same way as 01 and 02 calls from any kind of line including mobile, BT, other fixed line or payphone.
                    </p>
                </div>
            </div>
        <AuthNav />
    </div>
  )
}

export default RootLayout