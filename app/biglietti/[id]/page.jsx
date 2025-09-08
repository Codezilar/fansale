"use client"

import Footer from '../../../components/Footer'
import NavBar from '../../../components/NavBar'
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
import Recommendation from '../../../components/Recommendation';
import SecondFooter from '../../../components/SecondFooter';
import { MdLocationPin } from "react-icons/md";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react'

const Page = () => {
  const params = useParams();
  const id = params?.id;
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchTicket(id);
    } else {
      setLoading(false);
      setError('No ticket ID provided');
    }
  }, [id]);

  const fetchTicket = async (ticketId) => {
    try {
      const response = await fetch(`/api/tickets/artist/${ticketId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setTicket(data.data);
      } else {
        setError(data.message || 'Ticket not found');
      }
    } catch (error) {
      console.error('Error fetching ticket:', error);
      setError('Error loading ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <NavBar />
        <div className="main-container">
          <div className="loading">Loading ticket details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="error-container">
        <NavBar />
        <div className="main-container">
          <div className="error-message">
            <h1>Ticket Not Found</h1>
            <p>{error || 'The requested ticket could not be found.'}</p>
            <Link href="/" className="back-link">
              <FaChevronLeft /> Back to home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <main>
        <div className="main-container">
          <div className="biglietti-top">
            <p>fanSALE {'>'} Pop & Rock {'>'} {ticket.artistName} {'>'} {ticket.artistName} {'>'} {ticket.locationInfo}</p>
          </div>
          <div className="resale">
            <p>fanSALE is a secondary ticket resale market, where tickets are always priced at the original price.</p>
          </div>
          <div className="cremonini">
            <div className="cremonini-container">
              <div className='cremonini-top'></div>
              <div className='cremonini-bottom'></div>
            </div>
            <div className="cremonini-content">
              <div className="cremonini-img">
                <Image 
                  height={150} 
                  width={150} 
                  src={ticket.imageUrl || '/lord-huron.jpg'} 
                  className='creIMG' 
                  alt={ticket.artistName} 
                />
              </div>
              <div className="cremonini-text">
                <h1>{ticket.artistName}</h1>
                <p>{ticket.locationInfo}</p>
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
                    <h1>Amount <br />{ticket.numberOfTickets}</h1>
                  </div>
                  <div className="dish-right">
                    <span>
                      <h1>Dish</h1>
                      <h1>Fixed price € {ticket.price}</h1>
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
                      <p>{ticket.numberOfTickets}</p>
                    </span>
                    <span>
                      <h3>Offer details:</h3>
                      <p>Single</p>
                    </span>
                    <span>
                      <h3>{ticket.numberOfTickets} ticket for € {ticket.price}.00 :</h3>
                      <p>€ {ticket.price}.00</p>
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
                      <h1>€ {ticket.price + 4}.00</h1>
                    </span>
                    <div className='vat'>
                      <h2>VAT included</h2>
                    </div>
                  </div>
                  <Link href={`/buy/${ticket._id}`}>
                    <button className='cursor-pointer'>
                      Buy
                    </button>
                  </Link>
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
              <Link href={'#'}>Have you purchased tickets for {ticket.artistName} , {ticket.locationInfo}, but can't attend the event? No problem: with fanSALE, you can sell your tickets easily, quickly, and securely through TicketOne's online marketplace. This way, you can legally sell your tickets to real fans, even for sold-out events. Sell</Link>
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

export default Page