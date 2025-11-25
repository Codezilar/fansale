// pages/api/tickets/[id].js
import dbConnect from '../../../lib/dbConnect';
import Ticket from '../../../models/Ticket';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set longer timeout for this API route
export const config = {
  api: {
    responseLimit: false,
    externalResolver: true,
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  // Set timeout to 30 seconds
  req.setTimeout(30000);
  
  const {
    query: { id },
    method,
  } = req;

  try {
    await dbConnect();

    switch (method) {
      case 'GET':
        try {
          // Check if ID is provided
          if (!id) {
            return res.status(400).json({ success: false, message: 'Ticket ID is required' });
          }

          // Find ticket by ID
          const ticket = await Ticket.findById(id);
          
          if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
          }
          
          res.status(200).json({ success: true, data: ticket });
        } catch (error) {
          console.error('Error fetching ticket:', error);
          res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
        break;

      case 'DELETE':
        try {
          // Check if ID is provided
          if (!id) {
            return res.status(400).json({ success: false, message: 'Ticket ID is required' });
          }

          // Find ticket by ID first to get the image public ID
          const ticket = await Ticket.findById(id);
          
          if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
          }

          // Delete the image from Cloudinary if it exists
          if (ticket.imagePublicId) {
            try {
              await cloudinary.uploader.destroy(ticket.imagePublicId);
              console.log('Image deleted from Cloudinary:', ticket.imagePublicId);
            } catch (cloudinaryError) {
              console.error('Error deleting image from Cloudinary:', cloudinaryError);
              // Continue with ticket deletion even if image deletion fails
            }
          }

          // Delete the ticket from database
          await Ticket.findByIdAndDelete(id);
          
          res.status(200).json({ success: true, message: 'Ticket deleted successfully' });
        } catch (error) {
          console.error('Error deleting ticket:', error);
          res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
        break;
        
      default:
        res.setHeader('Allow', ['GET', 'DELETE']);
        res.status(405).json({ success: false, message: `Method ${method} not allowed` });
        break;
    }
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, message: 'Database connection failed', error: error.message });
  }
}