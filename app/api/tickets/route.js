// app/api/tickets/route.js
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '../../lib/dbConnect';
import Ticket from '../../models/Ticket';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request) {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected successfully');
    
    const formData = await request.formData();
    const artistName = formData.get('artistName');
    const locationInfo = formData.get('locationInfo');
    const numberOfTickets = formData.get('numberOfTickets');
    const price = formData.get('price');
    const imageFile = formData.get('image');
    
    console.log('Received form data:', { 
      artistName, 
      locationInfo, 
      numberOfTickets, 
      price,
      hasImage: !!imageFile 
    });
    
    if (!imageFile || imageFile === 'null') {
      console.log('No image file provided');
      return NextResponse.json(
        { success: false, message: 'Image is required' },
        { status: 400 }
      );
    }
    
    // Convert image file to buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log('Uploading to Cloudinary...');
    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'ticket_images' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Cloudinary upload successful:', result.secure_url);
            resolve(result);
          }
        }
      ).end(buffer);
    });
    
    console.log('Creating ticket in database...');
    const ticket = await Ticket.create({
      artistName,
      locationInfo,
      numberOfTickets: parseInt(numberOfTickets),
      price: parseFloat(price),
      imageUrl: result.secure_url,
      imagePublicId: result.public_id,
    });

    console.log('Ticket created successfully:', ticket._id);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Ticket created successfully', 
        data: ticket 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating ticket:', error);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error', 
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const tickets = await Ticket.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(
      { 
        success: true, 
        data: tickets 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching tickets:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}