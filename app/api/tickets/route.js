import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '../../lib/dbConnect';
import Ticket from '../../models/Ticket';

// Configure Cloudinary once
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request) {
  try {
    console.log('📨 Ticket submission received');

    // DB connect
    await dbConnect();
    console.log('✅ Database connected successfully');

    const formData = await request.formData();

    const artistName = formData.get('artistName');
    const locationInfo = formData.get('locationInfo');
    const numberOfTickets = formData.get('numberOfTickets');
    const price = formData.get('price');
    const imageFile = formData.get('image');

    console.log('Received form data:', { artistName, locationInfo, numberOfTickets, price });

    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json(
        { success: false, message: 'Image is required' },
        { status: 400 }
      );
    }

    // Validate size and type
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (imageFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: 'Image too large. Max 5MB allowed' },
        { status: 400 }
      );
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { success: false, message: `Invalid file type: ${imageFile.type}` },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('📤 Uploading to Cloudinary...');
    let uploadResult;
    try {
      uploadResult = await cloudinary.uploader.upload(
        `data:${imageFile.type};base64,${buffer.toString('base64')}`,
        { folder: 'ticket_images' }
      );
      console.log('✅ Cloudinary upload success:', uploadResult.secure_url);
    } catch (err) {
      console.error('❌ Cloudinary upload failed:', err.message);
      return NextResponse.json(
        { success: false, message: 'Image upload failed. Check Cloudinary credentials.', error: err.message },
        { status: 500 }
      );
    }

    // Save ticket in DB
    const ticket = await Ticket.create({
      artistName,
      locationInfo,
      numberOfTickets: parseInt(numberOfTickets),
      price: parseFloat(price),
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
    });

    console.log('✅ Ticket created:', ticket._id);

    return NextResponse.json(
      { success: true, message: 'Ticket created successfully', data: ticket },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Ticket creation error:', error.message);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const tickets = await Ticket.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: tickets }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error fetching tickets', error: error.message },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
