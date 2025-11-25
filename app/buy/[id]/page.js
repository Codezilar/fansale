"use client"
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';

const Page = () => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [paymentUrl, setPaymentUrl] = useState('');
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
      url: 'https://paybills.com/pay',
      type: 'redirect',
      description: 'Secure crypto payments'
    },
    {
      name: 'NOWPayments',
      url: 'https://nowpayments.io/payment',
      type: 'redirect', 
      description: 'Instant crypto processing'
    },
    {
      name: 'CoinGate',
      url: 'https://coingate.com/pay',
      type: 'redirect',
      description: 'Multi-currency support'
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
      const response = await fetch(`/api/tickets/artist/${ticketId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setTicket(data.data);
        // Generate payment URL after ticket is loaded
        generatePaymentUrl(data.data.price);
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

  const generatePaymentUrl = (amount) => {
    // Using PAYBILLS as primary provider
    const baseUrl = 'https://paybills.com/pay';
    const params = new URLSearchParams({
      address: walletAddress,
      amount: amount,
      currency: 'GBP',
      source: 'fansale',
      callback: `${window.location.origin}/payment-success`
    });
    
    setPaymentUrl(`${baseUrl}?${params.toString()}`);
  };

  const handleProviderRedirect = (provider) => {
    setIsRedirecting(true);
    
    // Construct payment URL based on provider
    let paymentEndpoint = '';
    
    switch(provider.name) {
      case 'PAYBILLS':
        paymentEndpoint = `https://paybills.com/pay?address=${walletAddress}&amount=${ticket.price}&currency=GBP`;
        break;
      case 'NOWPayments':
        paymentEndpoint = `https://nowpayments.io/payment?i=1&address=${walletAddress}&amount=${ticket.price}&currency=btc`;
        break;
      case 'CoinGate':
        paymentEndpoint = `https://coingate.com/pay/invoice?address=${walletAddress}&amount=${ticket.price}`;
        break;
      default:
        paymentEndpoint = paymentUrl;
    }
    
    // Redirect to payment provider
    window.location.href = paymentEndpoint;
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
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="main-container">
          <div className="loading">Loading ticket details...</div>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="error-container">
        <div className="main-container">
          <div className="error-message">
            <h1>Ticket Not Found</h1>
            <p>{error || 'The requested ticket could not be found.'}</p>
            <Link href="/" className="back-link">
              <FaChevronLeft /> Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Crypto Payment | Complete Your Transaction</title>
        <meta name="description" content="Complete your crypto payment securely" />
      </Head>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Crypto Payment</h1>
            <p className="text-gray-600">Choose your payment method</p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-red-50 rounded-full">
              <span className="text-red-600 font-mono text-lg font-semibold">
                ⏰ {formatTime(timeLeft)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Complete payment before timer expires
            </p>
          </div>

          {/* Payment Providers */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">
              Select Payment Provider
            </h3>
            <div className="space-y-3">
              {paymentProviders.map((provider, index) => (
                <button
                  key={provider.name}
                  onClick={() => handleProviderRedirect(provider)}
                  disabled={isRedirecting}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 group-hover:text-blue-700">
                      {provider.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {provider.description}
                    </div>
                  </div>
                  <div className="text-blue-600 font-semibold">
                    Pay £{ticket.price}
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
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">Scan QR code with your wallet</p>
            </div>

            {/* Wallet Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wallet Address
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={walletAddress}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono bg-gray-50 text-gray-700 overflow-x-auto"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
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
                <span className="font-mono">£{ticket.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">No of Tickets:</span>
                <span className="font-mono">{ticket.numberOfTickets} {ticket.numberOfTickets === 1 ? "Ticket" : "Tickets"}</span>
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
              <li>• Send exactly £{ticket.price} of BTC</li>
              <li>• Use Bitcoin Mainnet only</li>
              <li>• Do not send from exchange wallets</li>
              <li>• Transaction may take 2-3 minutes to confirm</li>
            </ul>
          </div>

          {/* Redirecting Indicator */}
          {isRedirecting && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-center font-semibold">
                Redirecting to payment provider...
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