"use client"
import React, { useState, useEffect } from 'react'
import { IoTicketSharp } from "react-icons/io5";
import { IoCopy } from "react-icons/io5";
import { FaBarsStaggered } from "react-icons/fa6";

const Page = ({navigateNav}) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('/api/tickets');
      const data = await response.json();
      
      if (data.success) {
        setTickets(data.data);
      } else {
        setError('Failed to fetch tickets');
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setError('Error fetching tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyProfileLink = (ticketId) => {
    // Create the full URL for the artist profile
    const profileUrl = `${window.location.origin}/biglietti/${ticketId}`;
    
    navigator.clipboard.writeText(profileUrl)
      .then(() => {
        alert('Profile link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy link. Please try again.');
      });
  };

  const viewProfile = (ticketId) => {
    // Navigate to the artist profile page
    window.open(`/biglietti/${ticketId}`, '_blank');
  };

  if (loading) {
    return (
      <div className='dash'>
        <div className="dash-top">
          <span><IoTicketSharp className='text-2xl font-extrabold text-yellow-600' /><p>Tickets</p></span>
        </div>
        <div className="tickets_admin">
          <div className="tickets_admin-container">
            <div className="loading">Loading tickets...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='dash'>
        <div className="dash-top">
          <span><IoTicketSharp className='text-2xl font-extrabold text-yellow-600' /><p>Tickets</p></span>
        </div>
        <div className="tickets_admin">
          <div className="tickets_admin-container">
            <div className="error">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='dash'>
      <div className="dash-top">
        <span><IoTicketSharp className='text-2xl font-extrabold text-yellow-600' /><p>Tickets</p></span>
      </div>
      <div className="tickets_admin">
        <div className="tickets_admin-container">
          <div className="tickets_admin-top ticket_delete">
            <h1>Artist</h1>
            <h1 className='locationInfo'>Description</h1>
            <h1 >Tickets</h1>
            <h1>Actions</h1>
          </div>
          
          {tickets.length === 0 ? (
            <div className="no-tickets">
              <p>No tickets available. Create some tickets first.</p>
            </div>
          ) : (
            tickets.map(ticket => (
              <div key={ticket._id} className="tickets_admin-top ticket_delete artist-manage">
                <h1>{ticket.artistName}</h1>
                <h1 className='locationInfo'>{ticket.locationInfo}</h1>
                <h1 className='text-center'>{ticket.numberOfTickets}</h1>
                <div className="action-buttons flex gap-1">
                  <button 
                    onClick={() => viewProfile(ticket._id)}
                    className="view-btn"
                  >
                    <p>View</p>
                  </button>
                  <button 
                    onClick={() => copyProfileLink(ticket._id)}
                    className="copy-btn"
                  >
                    <p>Copy</p>
                    <IoCopy />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .ticket_delete h1 {
          font-size: 16px;
          font-weight: 600;
          margin: 0;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .view-btn:hover {
          background: #2563eb;
        }
        .copy-btn {
          background: #f59e0b;
          color: white;
        }
        .copy-btn:hover {
          background: #e6900b;
        }
        .loading, .error, .no-tickets {
          text-align: center;
          padding: 40px;
          font-size: 18px;
          color: #666;
        }
        .error {
          color: #ef4444;
        }
      `}</style>
    </div>
  )
}

export default Page