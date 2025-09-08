"use client"
import React, { useState, useEffect } from 'react'
import { FcDeleteDatabase } from "react-icons/fc";

const Page = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('/api/tickets');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.success) {
        setTickets(data.data);
      } else {
        setError(data.message || 'Failed to fetch tickets');
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setError('Error fetching tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ticketId) => {
    if (!confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) {
      return;
    }

    setDeletingId(ticketId);
    
    try {
      console.log('Attempting to delete ticket with ID:', ticketId);
      const response = await fetch(`/api/tickets/artist/${ticketId}`, {
        method: 'DELETE',
      });
      
      console.log('Delete response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete failed with response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Delete response data:', data);
      
      if (data.success) {
        // Remove the deleted ticket from the list
        setTickets(tickets.filter(ticket => ticket._id !== ticketId));
        alert('Ticket deleted successfully!');
      } else {
        alert('Failed to delete ticket: ' + data.message);
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
      alert('Error deleting ticket. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className='dash'>
        <div className="dash-top">
          <span><FcDeleteDatabase className='text-2xl font-extrabold text-yellow-600' /><p>Delete</p></span>
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
          <span><FcDeleteDatabase className='text-2xl font-extrabold text-yellow-600' /><p>Delete</p></span>
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
        <span><FcDeleteDatabase className='text-2xl font-extrabold text-yellow-600' /><p>Delete Tickets</p></span>
      </div>
      <div className="tickets_admin">
        <div className="tickets_admin-container">
          <div className="tickets_admin-top ticket_delete">
            <h1>Artist</h1>
            <h1 className='locationInfo'>Description</h1>
            <h1>Tickets</h1>
            <h1>Action</h1>
          </div>
          
          {tickets.length === 0 ? (
            <div className="no-tickets">
              <p>No tickets available to delete.</p>
            </div>
          ) : (
            tickets.map(ticket => (
              <div key={ticket._id} className="tickets_admin-top ticket_delete artist-manage">
                <h1>{ticket.artistName}</h1>
                <h1 className='locationInfo'>{ticket.locationInfo}</h1>
                <h1 className='text-center'>{ticket.numberOfTickets}</h1>
                <button 
                  onClick={() => handleDelete(ticket._id)}
                  disabled={deletingId === ticket._id}
                  className={deletingId === ticket._id ? 'deleting' : ''}
                >
                  <p>{deletingId === ticket._id ? 'Deleting...' : 'Delete'}</p>
                  <FcDeleteDatabase />
                </button>
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
        .artist-manage:hover {
          background: #fef2f2;
          border-color: #fecaca;
        }
        button:hover:not(:disabled) {
          background: #dc2626;
          transform: translateY(-1px);
        }
        button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
        button.deleting {
          background: #f59e0b;
        }
        button.deleting:hover {
          background: #d97706;
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