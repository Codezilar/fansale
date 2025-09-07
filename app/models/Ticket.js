// models/Ticket.js
import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  artistName: {
    type: String,
    required: [true, 'Artist name is required'],
    trim: true,
    maxlength: [100, 'Artist name cannot be more than 100 characters']
  },
  locationInfo: {
    type: String,
    required: [true, 'Location information is required'],
    trim: true,
    maxlength: [200, 'Location information cannot be more than 200 characters']
  },
  numberOfTickets: {
    type: Number,
    required: [true, 'Number of tickets is required'],
    min: [1, 'Number of tickets must be at least 1'],
    max: [1000, 'Number of tickets cannot exceed 1000']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  imagePublicId: {
    type: String,
    required: [true, 'Image public ID is required']
  }
}, {
  timestamps: true
});

// Prevent model overwrite upon hot reloads
export default mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);