// app/api/tickets/route.js
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '../../lib/dbConnect';
import Ticket from '../../models/Ticket';

// Configure Cloudinary with validation
let cloudinaryConfigured = false;
try {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('❌ Cloudinary environment variables missing');
  } else if (cloudName === 'your_cloud_name' || apiKey === 'your_api_key' || apiSecret === 'your_api_secret') {
    console.error('❌ Cloudinary using placeholder values');
  } else {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    cloudinaryConfigured = true;
    console.log('✅ Cloudinary configured successfully');
  }
} catch (configError) {
  console.error('❌ Cloudinary config error:', configError);
}

// Test Cloudinary connection
async function testCloudinaryConnection() {
  if (!cloudinaryConfigured) return false;
  
  try {
    // Simple API call to test connection
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary connection test successful');
    return true;
  } catch (error) {
    console.error('❌ Cloudinary connection test failed:', error.message);
    return false;
  }
}

export async function POST(request) {
  try {
    console.log('📨 Ticket submission received');
    
    // Test Cloudinary connection first
    const cloudinaryConnected = await testCloudinaryConnection();
    if (!cloudinaryConnected) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Image service unavailable. Please try again later.',
          ...(process.env.NODE_ENV === 'development' && {
            details: 'Cloudinary connection failed - check credentials'
          })
        },
        { status: 503 }
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
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // Reduced to 5MB for safety
    if (imageFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: 'Image size too large. Maximum size is 5MB' },
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
    
    // Upload to Cloudinary with explicit error handling
    let uploadResult;
    try {
      uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { 
            folder: 'ticket_images',
            resource_type: 'image',
            timeout: 15000 // 15 second timeout
          },
          (error, result) => {
            if (error) {
              console.error('❌ Cloudinary upload failed:', {
                message: error.message,
                http_code: error.http_code,
                name: error.name
              });
              reject(new Error(`Cloudinary upload failed: ${error.message}`));
            } else {
              console.log('✅ Cloudinary upload successful');
              resolve(result);
            }
          }
        );
        
        uploadStream.on('error', (error) => {
          console.error('❌ Upload stream error:', error);
          reject(new Error(`Upload stream error: ${error.message}`));
        });
        
        uploadStream.end(buffer);
      });
    } catch (uploadError) {
      console.error('❌ Cloudinary upload exception:', uploadError.message);
      
      // Check if it's a credential issue
      if (uploadError.message.includes('401') || uploadError.message.includes('Unauthorized')) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Image service configuration error',
            ...(process.env.NODE_ENV === 'development' && {
              details: 'Invalid Cloudinary credentials'
            })
          },
          { status: 500 }
        );
      }
      
      // Check for timeout
      if (uploadError.message.includes('timeout') || uploadError.message.includes('TIMEDOUT')) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Upload timeout. Please try again with a smaller image.' 
          },
          { status: 408 }
        );
      }
      
      throw uploadError;
    }

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
    console.error('❌ Ticket creation error:', error.message);
    
    // Handle specific error types
    if (error.message.includes('Cloudinary') || error.message.includes('upload')) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Image upload service temporarily unavailable. Please try again later.',
          ...(process.env.NODE_ENV === 'development' && {
            error: error.message
          })
        },
        { status: 503 }
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
        message: 'Server error. Please try again.',
        ...(process.env.NODE_ENV === 'development' && {
          error: error.message
        })
      },
      { status: 500 }
    );
  }
}

// Simple GET without Cloudinary dependency
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