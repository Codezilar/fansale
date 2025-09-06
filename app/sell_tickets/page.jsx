import React from 'react'
import Recommendation from '../../components/Recommendation'
import SecondFooter from '../../components/SecondFooter'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'

const page = () => {
  return (
     <>
        <NavBar />
            <main>
                <div className="main-container">
                    <div className="eventim">
                        <span className='eventim-top'>
                            <h1>Sell Eventim tickets</h1>
                        </span>
                        <div className="eventim-container">
                            <svg className='h-[15rem] w-[28rem]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 417.3 200"><g fill="#202867"><path d="M29.5 90.6c2-4.3 4.7-7.7 8.4-10.1 3.6-2.5 7.8-3.7 12.6-3.7 7.2 0 12.9 2.6 16.9 7.9 4.1 5.3 6.1 12.2 6.1 20.7v3.8H39.9c.3 3.8 1.6 7 3.8 9.4 2.2 2.4 5.3 3.7 9.2 3.7 2.1 0 4.2-.5 6.3-1.4 2.1-.9 3.9-2.2 5.4-3.8l6.1 8c-2.4 2.6-5.2 4.6-8.6 5.9-3.4 1.4-6.9 2-10.6 2-4.9 0-9.3-1.2-13.1-3.5-3.8-2.3-6.7-5.6-8.8-9.9-2.1-4.3-3.1-9.2-3.1-14.7 0-5.3 1-10 3-14.3zm13.1.6c-1.7 2.5-2.6 5.4-2.7 8.8h20.7c-.1-3.3-1-6.2-2.7-8.8-1.6-2.5-4.2-3.8-7.8-3.8-3.3.1-5.8 1.3-7.5 3.8zM71.3 78.1h14.2l10.7 37.6 10.9-37.6h14.2l-17.8 53.5H89.1L71.3 78.1zM122.2 90.6c2-4.3 4.7-7.7 8.4-10.1 3.6-2.5 7.8-3.7 12.6-3.7 7.2 0 12.9 2.6 16.9 7.9 4.1 5.3 6.1 12.2 6.1 20.7v3.8h-33.6c.3 3.8 1.6 7 3.8 9.4 2.2 2.4 5.3 3.7 9.2 3.7 2.1 0 4.2-.5 6.3-1.4 2.1-.9 3.9-2.2 5.4-3.8l6.1 8c-2.4 2.6-5.2 4.6-8.6 5.9-3.4 1.4-6.9 2-10.6 2-4.9 0-9.3-1.2-13.1-3.5-3.8-2.3-6.7-5.6-8.8-9.9-2.1-4.3-3.1-9.2-3.1-14.7 0-5.3 1-10 3-14.3zm13.2.6c-1.7 2.5-2.6 5.4-2.7 8.8h20.7c-.1-3.3-1-6.2-2.7-8.8-1.6-2.5-4.2-3.8-7.8-3.8-3.4.1-5.9 1.3-7.5 3.8zM200.2 96.3c0-5.2-2.3-7.9-7-7.9-2.1 0-3.9.6-5.6 1.9-1.7 1.3-3 2.9-4.2 4.7v36.4h-13.3V78.1h13.3v7c1.6-2.3 3.7-4.2 6.6-5.9 2.8-1.6 5.9-2.4 9.1-2.4 4.8 0 8.4 1.3 10.7 3.9 2.4 2.6 3.5 6.2 3.5 10.7v40.2H200V96.3zM226.4 129.4c-2.2-2.4-3.3-5.9-3.3-10.6v-29h-7V78.1h7V63.4h13.3V78h8.9v11.6h-8.9v25.9c0 1.8.3 3.1 1 4.1.7 1 1.6 1.4 2.9 1.4.8 0 1.6-.1 2.3-.4.7-.3 1.3-.7 1.7-1.1l2.8 10.2c-2.3 2.1-5.7 3.1-10.3 3.1-4.8.1-8.2-1.1-10.4-3.4zM250.8 67.9c-1.6-1.6-2.4-3.4-2.4-5.6 0-2.2.8-4.1 2.4-5.7 1.6-1.6 3.5-2.4 5.6-2.4 2.2 0 4.1.8 5.6 2.4 1.6 1.6 2.3 3.5 2.3 5.7s-.8 4.1-2.3 5.6c-1.6 1.6-3.4 2.3-5.6 2.3-2.2 0-4-.8-5.6-2.3zm-1.1 10.2H263v53.5h-13.3V78.1zM326.8 95.6c0-4.7-2-7.1-6.1-7.1-1.9 0-3.7.7-5.3 2-1.6 1.3-2.9 2.9-3.9 4.7v36.4h-13.3v-36c0-4.7-2-7.1-6.1-7.1-1.8 0-3.6.7-5.3 2-1.7 1.3-3 2.9-3.9 4.7v36.4h-13.3V78.1H283v7c1.2-2.1 3.2-4 6-5.7 2.8-1.7 5.9-2.6 9-2.6 3.4 0 6.2.8 8.5 2.4 2.3 1.6 3.7 3.9 4.5 6.9 1.3-2.5 3.5-4.7 6.4-6.5 3-1.8 6-2.8 9.2-2.8 4.3 0 7.6 1.2 10 3.5 2.4 2.3 3.5 5.9 3.5 10.7v40.7h-13.3V95.6z"/></g><path d="M353.7 63.5c6.2 6.2 6.4 15.9 6.4 22.6h1.5c0-6.7.2-16.4 6.4-22.6 6.2-6.2 15.9-6.4 22.6-6.4v-1.5c-6.7 0-16.4-.2-22.6-6.4-6.2-6.2-6.4-15.9-6.4-22.6H360c0 6.7-.2 16.4-6.4 22.6-6.2 6.2-15.9 6.4-22.6 6.4v1.5c6.8 0 16.5.2 22.7 6.4z" fill="#feca27"/></svg>
                            <div className="eventim-text">
                                <h2>Sell your Eventim tickets</h2>
                                <p>Just enter the barcode of your Eventim tickets – all information will be filled in automatically.</p>
                            </div>
                            <Link href={""}>
                                <button>Sell Evenim tickets</button>
                            </Link>
                        </div>
                    </div>
                    <div className="tickets">
                        <div className="tickets-top">
                            <h1>It’s easy to sell your tickets on fan<span>SALE</span></h1>
                        </div>
                        <div className="tickets-container">
                            <div className="ticket-content">
                                <Image src={'/ticket.svg'} height={90} width={90} alt='jh' />
                                <div className="ticket-text">
                                    <h1>1) Ticket details</h1>
                                    <p>Enter barcode or ticket details, determine price and runtime and offer your tickets for sale free of charge.</p>
                                </div>
                            </div>
                            <div className="ticket-content">
                                <Image src={'/collect.svg'} height={90} width={90} alt='jh' />
                                <div className="ticket-text">
                                    <h1>2) Sale and collection</h1>
                                    <p>After you’ve sold your tickets successfully we arrange free collection at your place by our service provider.</p>
                                </div>
                            </div>
                            <div className="ticket-content">
                                <Image src={'/payment.svg'} height={90} width={90} alt='jh' />
                                <div className="ticket-text">
                                    <h1>3) Payment</h1>
                                    <p>As soon as the buyer has received the tickets the money will be transferred to your bank account.</p>    
                                </div>
                            </div>
                        </div>
                    </div>
                    <Recommendation />
                    <SecondFooter />
                </div>
            </main>
        <Footer />
    </>
  )
}

export default page