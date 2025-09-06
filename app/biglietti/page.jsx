import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import Image from 'next/image'
import React from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { RiHome2Fill } from "react-icons/ri";
import { LiaSearchMinusSolid } from "react-icons/lia";
import { LiaSearchPlusSolid } from "react-icons/lia";
import { PiHandshake } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";
import Recommendation from '@/components/Recommendation';
import SecondFooter from '@/components/SecondFooter';
import { MdLocationPin } from "react-icons/md";
import Link from 'next/link';

const page = () => {
  return (
    <>
        <NavBar />
            <main>
                <div className="main-container">
                    <div className="biglietti-top">
                        <p>fanSALE {'>'} Pop & Rock {'>'} LAZZA {'>'} LAZZA {'>'} TURIN, more 15/01/2025</p>
                    </div>
                    <div className="resale">
                        <p>fanSALE is a secondary ticket resale market, where tickets are always priced at the original price.</p>
                    </div>
                    <div className="cremonini">
                        <div className="cremonini-container">
                            <div className='cremonini-top'>

                            </div>
                            <div className='cremonini-bottom'>

                            </div>
                        </div>
                        <div className="cremonini-content">
                            <div className="cremonini-img">
                                <Image height={250} width={280} src={'/crem.jpeg'} className='creIMG' alt='fr' />
                            </div>
                            <div className="cremonini-text">
                                <h1>Cesare Cremonini</h1>
                                <p>Monday, July 7, 2025, 9:00 PM, Stadio Euganeo, 35100 PADOVA</p>
                            </div>
                        </div>
                    </div>
                    <div className="offers">
                        <div className="offers-top">
                            <div className="offers-top-left">
                                <FaChevronLeft className='font-bold text-xl text-blue-400' />
                                <h1>Back to all offers</h1>
                            </div>
                            <div className="offers-top-right">
                                <div className="box-offer">
                                    <RiHome2Fill />
                                </div>
                                <div className="box-offer">
                                    <LiaSearchMinusSolid />
                                </div>
                                <div className="box-offer">
                                    <LiaSearchPlusSolid />
                                </div>
                            </div>
                        </div>
                        <div className="offers-container">
                            <div className="offers-left">
                                <div className="dish">
                                    <div className="dish-left">
                                        <h1>Amount <br /> 1</h1>
                                    </div>
                                    <div className="dish-right">
                                        <span>
                                            <h1>Dish</h1>
                                            <h1>Fixed price € 69</h1>
                                        </span>
                                        <span className='dish_coin'>
                                            <PiHandshake className='PiHandshake' />
                                            <FaCheck className='FaCheck' />
                                        </span>
                                    </div>
                                </div>
                                <div className="buy bg-gray-50">
                                    <div className="buy-top">
                                        <div className='buy-top-left'>
                                            <FaRegCheckSquare />
                                        </div>
                                        <div className='buy-top-right'>
                                            <p>Dish</p>
                                            <span>
                                                <p>entire</p> <p className='underline'>Composition of the pear</p>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="buy-info">
                                        <span>
                                            <h3>Select the number of tickets:</h3>
                                            <p>1</p>
                                        </span>
                                        <span>
                                            <h3>Offer details:</h3>
                                            <p>Single</p>
                                        </span>
                                        <span>
                                            <h3>1 ticket for € 69.00 :</h3>
                                            <p>€ 69.00</p>
                                        </span>
                                        <span>
                                            <h3>Service fees</h3>
                                            <p>€ 4.00</p>
                                        </span>
                                        <span>
                                            <h3>Ticket delivery with:</h3>
                                            <p>TicketOne</p>
                                        </span>
                                        <span >
                                            <h1>Fixed price:</h1>
                                            <h1>€ 73.00</h1>
                                        </span>
                                        <div className='vat'>
                                            <h2>VAT included</h2>
                                        </div>
                                    </div>
                                    <button>
                                        Buy
                                    </button>
                                    <div className="fav">
                                        <div className="fav-left">
                                            <TiPin className='text-[#FBC933]' />
                                            <p>Add to favorites</p>
                                        </div>
                                        <div className="fav-left">
                                            <FaHeart className='text-[#FBC933]'/>
                                            <p>Tell a friend</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="offers-right">
                                <div className="map">
                                    <p>Map loading error</p>
                                </div>
                                <div className="place">
                                    <div className="place-container">
                                        <p className='select_other'>Selected places <MdLocationPin className='jhgvbdnkh' /></p>
                                        <p className='place_other'>Other offers <MdLocationPin className='jhgvbdnkh' /></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="recomendation">
                        <h1>Offer Notice</h1>
                        <p>
                        <Link href={'#'}>Didn't find what you were looking for? Our Offer Alert will let you know as soon as offers for your desired event become available on fanSALE. Simply set your search criteria and you'll receive the best deals by email within the desired timeframe. Create your Offer Alert</Link>
                        </p>
                    </div>
                    <div className="recomendation">
                        <h1>Sell ​​tickets</h1>
                        <p>
                        <Link href={'#'}>Have you purchased tickets for Cesare Cremonini , Monday, July 7, 2025, 9:00 PM, Stadio Euganeo, 35100 PADOVA TURIN, but can't attend the event? No problem: with fanSALE, you can sell your tickets easily, quickly, and securely through TicketOne's online marketplace. This way, you can legally sell your tickets to real fans, even for sold-out events. Sell</Link>
                        </p>
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