// app/api/tickets/route.js
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '../../lib/dbConnect';
import Ticket from '../../models/Ticket';

// Configure Cloudinary with error handling
try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  console.log('✅ Cloudinary configured');
} catch (configError) {
  console.error('❌ Cloudinary config error:', configError);
}

export async function POST(request) {
  try {
    console.log('📨 Ticket submission received');
    
    // Check Cloudinary configuration
    const cloudinaryConfig = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    };

    console.log('Cloudinary config check:', {
      hasCloudName: !!cloudinaryConfig.cloud_name,
      hasApiKey: !!cloudinaryConfig.api_key,
      hasApiSecret: !!cloudinaryConfig.api_secret,
      nodeEnv: process.env.NODE_ENV
    });

    if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
      console.error('❌ Cloudinary configuration missing');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Server configuration error',
          details: process.env.NODE_ENV === 'development' ? 'Cloudinary credentials missing' : undefined
        },
        { status: 500 }
      );
    }

    console.log('Connecting to database...');
    await dbConnect();
    console.log('✅ Database connected successfully');
    
    const formData = await request.formData();
    
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
      hasImage: !!imageFile,
      imageType: imageFile?.type,
      imageSize: imageFile?.size
    });

    if (!imageFile || imageFile === 'null' || imageFile.size === 0) {
      console.log('No image file provided');
      return NextResponse.json(
        { success: false, message: 'Image is required' },
        { status: 400 }
      );
    }

    // File validation
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (imageFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: 'Image size too large. Maximum size is 10MB' },
        { status: 400 }
      );
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid file type. Please upload an image (JPEG, PNG, GIF, WEBP).',
          receivedType: imageFile.type
        },
        { status: 400 }
      );
    }
    
    // Convert image file to buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log('Uploading to Cloudinary...');
    
    // Upload to Cloudinary with promise-based approach
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'ticket_images',
          resource_type: 'image',
          timeout: 30000 // 30 second timeout
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary upload error details:', {
              message: error.message,
              name: error.name,
              http_code: error.http_code,
              status: error.status
            });
            reject(error);
          } else {
            console.log('✅ Cloudinary upload successful:', {
              url: result.secure_url,
              public_id: result.public_id,
              format: result.format,
              bytes: result.bytes
            });
            resolve(result);
          }
        }
      );
      
      // Handle stream errors
      uploadStream.on('error', (error) => {
        console.error('❌ Cloudinary stream error:', error);
        reject(error);
      });
      
      uploadStream.end(buffer);
    });

    console.log('Creating ticket in database...');
    const ticket = await Ticket.create({
      artistName,
      locationInfo,
      numberOfTickets: parseInt(numberOfTickets),
      price: parseFloat(price),
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
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

  } catch (error) {
    console.error('❌ Ticket creation error:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      code: error.code,
      http_code: error.http_code
    });
    
    // Handle specific error types
    if (error.message.includes('ETIMEDOUT') || error.message.includes('timeout')) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Upload timeout. Please try again with a smaller image.' 
        },
        { status: 408 }
      );
    }
    
    if (error.http_code === 401) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Authentication error. Please check server configuration.' 
        },
        { status: 500 }
      );
    }
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, message: 'Validation failed. Please check your input.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to upload image. Please try again.',
        ...(process.env.NODE_ENV === 'development' && {
          error: error.message,
          details: error.http_code ? `Cloudinary error: ${error.http_code}` : undefined
        })
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

export const config = {
  api: {
    bodyParser: false,
  },
};