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

// Helper function for Cloudinary upload with retry logic
const uploadWithRetry = async (buffer, folder, filename, retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`📤 Upload attempt ${attempt} for ${folder}`);
      return await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder, public_id: filename },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(buffer);
      });
    } catch (error) {
      if (attempt === retries) throw error;
      console.warn(`⚠️ Upload attempt ${attempt} failed, retrying...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw new Error('All upload attempts failed');
};

export async function POST(request) {
  try {
    console.log('📨 Ticket submission received');
    
    // Check Cloudinary configuration first
    const cloudinaryConfig = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    };

    if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
      console.error('❌ Cloudinary configuration missing');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    console.log('Connecting to database...');
    await dbConnect();
    console.log('✅ Database connected successfully');
    
    const formData = await request.formData();
    
    // Validate all required fields
    const requiredFields = ['artistName', 'locationInfo', 'numberOfTickets', 'price', 'image'];
    const missingFields = requiredFields.filter(field => {
      const value = formData.get(field);
      return !value || (value instanceof File && value.size === 0);
    });

    if (missingFields.length > 0) {
      console.error('❌ Missing required fields:', missingFields);
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Extract form data
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

    // File validation
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (imageFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: 'Image size too large. Maximum size is 10MB' },
        { status: 400 }
      );
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Please upload an image (JPEG, PNG, GIF, WEBP).' },
        { status: 400 }
      );
    }
    
    // Convert image file to buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log('Uploading to Cloudinary...');
    
    try {
      // Upload to Cloudinary with retry logic
      const result = await uploadWithRetry(
        buffer, 
        'ticket_images', 
        `${artistName}_${Date.now()}`
      );

      console.log('✅ Cloudinary upload successful:', result.secure_url);
      
      console.log('Creating ticket in database...');
      const ticket = await Ticket.create({
        artistName,
        locationInfo,
        numberOfTickets: parseInt(numberOfTickets),
        price: parseFloat(price),
        imageUrl: result.secure_url,
        imagePublicId: result.public_id,
      });

      console.log('✅ Ticket created successfully:', ticket._id);
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Ticket created successfully', 
          data: ticket 
        },
        { status: 201 }
      );

    } catch (uploadError) {
      console.error('❌ File upload error:', uploadError);
      return NextResponse.json(
        { success: false, message: 'Failed to upload image. Please try again.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Ticket creation error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    
    if (error.code) {
      console.error('Error code:', error.code);
    }
    
    // Handle specific error types
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, message: 'Validation failed. Please check your input.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          name: error.name,
          code: error.code
        } : undefined
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

// Add config for body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};