"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaChevronLeft, FaExternalLinkAlt } from 'react-icons/fa';

const Page = () => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 1 hour in seconds
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const walletAddress = 'bc1puu5vr0yc95zcqgdgff0zucfhu0khm756t8du84r6z7dpdmtd6a4sf9qj5m'; 

  const params = useParams();
  const id = params?.id;
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Payment providers configuration
  const paymentProviders = [
    {
      name: 'PAYBILLS',
      url: 'https://paybills.com',
      type: 'redirect',
      description: 'Secure crypto payments',
      generateUrl: (amount, address) => `https://paybills.com/pay?address=${address}&amount=${amount}&currency=GBP`
    },
    {
      name: 'NOWPayments',
      url: 'https://nowpayments.io',
      type: 'redirect', 
      description: 'Instant crypto processing',
      generateUrl: (amount, address) => `https://nowpayments.io/payment?i=1&address=${address}&amount=${amount}&currency=btc`
    },
    {
      name: 'CoinGate',
      url: 'https://coingate.com',
      type: 'redirect',
      description: 'Multi-currency support',
      generateUrl: (amount, address) => `https://coingate.com/pay/invoice?address=${address}&amount=${amount}`
    },
    {
      name: 'Coinbase Commerce',
      url: 'https://commerce.coinbase.com',
      type: 'redirect',
      description: 'Enterprise-grade payments',
      generateUrl: (amount, address) => `https://commerce.coinbase.com/checkout?address=${address}&amount=${amount}`
    }
  ];

  useEffect(() => {
    if (id) {
      fetchTicket(id);
    } else {
      setLoading(false);
      setError('No ID provided');
    }
  }, [id]);

  const fetchTicket = async (ticketId) => {
    try {
      console.log('Fetching ticket with ID:', ticketId);
      
      // Try multiple API endpoints in case of routing issues
      const endpoints = [
        `/api/tickets/artist/${ticketId}`,
        `/api/tickets/${ticketId}`,
        `https://your-backend.com/api/tickets/${ticketId}` // Replace with your actual backend
      ];

      let response = null;
      let lastError = null;

      for (const endpoint of endpoints) {
        try {
          console.log('Trying endpoint:', endpoint);
          response = await fetch(endpoint);
          
          if (response.ok) {
            const data = await response.json();
            
            if (data.success && data.data) {
              setTicket(data.data);
              console.log('Ticket data loaded:', data.data);
              return; // Success, exit the function
            }
          }
        } catch (err) {
          lastError = err;
          console.log(`Endpoint ${endpoint} failed:`, err);
          continue; // Try next endpoint
        }
      }

      // If we get here, all endpoints failed
      throw new Error(lastError || 'All endpoints failed');

    } catch (error) {
      console.error('Error fetching ticket:', error);
      setError('Error loading ticket. Please check the ticket ID and try again.');
      
      // Fallback: Create a mock ticket for demonstration
      setTicket({
        price: '50.00',
        numberOfTickets: 1,
        eventName: 'Sample Event',
        artistName: 'Sample Artist'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProviderRedirect = (provider) => {
    if (!ticket) return;
    
    setIsRedirecting(true);
    
    // Generate the payment URL
    const paymentUrl = provider.generateUrl(ticket.price, walletAddress);
    
    console.log('Redirecting to:', paymentUrl);
    
    // Open in new tab
    const newWindow = window.open(paymentUrl, '_blank', 'noopener,noreferrer');
    
    if (newWindow) {
      newWindow.focus();
    } else {
      // Fallback if popup is blocked
      alert('Popup blocked! Please allow popups for this site or click the link manually.');
    }
    
    // Reset redirecting state after a short delay
    setTimeout(() => setIsRedirecting(false), 2000);
  };

  // Timer useEffect
  useEffect(() => {
    if (timeLeft <= 0) {
      setPaymentStatus('expired');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = walletAddress;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <div className="loading">Loading ticket details...</div>
          <div className="mt-4 text-sm text-gray-500">
            If this takes too long, please check your ticket ID.
          </div>
        </div>
      </div>
    );
  }

  if (error && !ticket) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
          <div className="error-message text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Ticket Not Found</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link 
              href="/" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaChevronLeft className="mr-2" /> Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Crypto Payment | Complete Your Transaction</title>
        <meta name="description" content="Complete your crypto payment securely" />
      </Head>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Crypto Payment</h1>
            <p className="text-gray-600">Choose your payment method</p>
            {ticket?.eventName && (
              <div className="mt-2 text-sm text-blue-600 font-semibold">
                {ticket.eventName}
              </div>
            )}
          </div>

          {/* Countdown Timer - 1 Hour */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-red-50 rounded-full">
              <span className="text-red-600 font-mono text-lg font-semibold">
                ⏰ {formatTime(timeLeft)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Complete payment within 1 hour
            </p>
          </div>

          {/* Payment Providers */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">
              Select Payment Provider
            </h3>
            <div className="space-y-3">
              {paymentProviders.map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => handleProviderRedirect(provider)}
                  disabled={isRedirecting}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="text-left flex-1">
                    <div className="font-semibold text-gray-900 group-hover:text-blue-700 flex items-center">
                      {provider.name}
                      <FaExternalLinkAlt className="ml-2 text-xs text-gray-400" />
                    </div>
                    <div className="text-sm text-gray-500">
                      {provider.description}
                    </div>
                  </div>
                  <div className="text-blue-600 font-semibold whitespace-nowrap ml-4">
                    Pay £{ticket?.price || '0.00'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* OR Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Manual Payment Option */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 text-center">
              Manual Payment
            </h3>
            
            {/* QR Code */}
            <div className="mb-4 text-center">
              <div className="inline-block p-4 bg-white rounded-lg border border-gray-200">
                <Image
                  src={'/buy.jpeg'}
                  alt="Bitcoin QR Code"
                  height={200}
                  width={200}
                  className='rounded-lg'
                  onError={(e) => {
                    console.log('Image failed to load, using fallback');
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">Scan QR code with your wallet</p>
            </div>

            {/* Wallet Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bitcoin Wallet Address
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={walletAddress}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-xs font-mono bg-gray-50 text-gray-700 overflow-x-auto"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors whitespace-nowrap"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-mono">£{ticket?.price || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">No of Tickets:</span>
                <span className="font-mono">
                  {ticket?.numberOfTickets || 1} {ticket?.numberOfTickets === 1 ? "Ticket" : "Tickets"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Network:</span>
                <span>Bitcoin Mainnet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-semibold ${
                  paymentStatus === 'pending' ? 'text-yellow-600' : 
                  paymentStatus === 'completed' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {paymentStatus.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Important Instructions</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Send exactly £{ticket?.price || '0.00'} worth of BTC</li>
              <li>• Use Bitcoin Mainnet only</li>
              <li>• Do not send from exchange wallets</li>
              <li>• Transaction may take 2-3 minutes to confirm</li>
              <li>• Payment window: 1 hour</li>
            </ul>
          </div>

          {/* Redirecting Indicator */}
          {isRedirecting && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-center font-semibold">
                Opening payment provider in new tab...
              </p>
            </div>
          )}

          {/* Status Indicator */}
          {paymentStatus === 'expired' && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-semibold text-center">
                Payment time expired. Please refresh to get a new address.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Need help? Contact support@fansale.com
        </p>
      </div>
    </div>
  );
};

export default Page;