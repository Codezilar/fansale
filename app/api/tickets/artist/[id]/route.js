// app/api/artist/[id]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Ticket from '../../../../models/Ticket';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    console.log('API Request received:', { id });

    // Check if ID is provided
    if (!id) {
      console.log('No valid ID provided');
      return NextResponse.json(
        { success: false, message: 'Ticket ID is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    console.log('Looking for ticket with ID:', id);
    
    // Find ticket by ID
    const ticket = await Ticket.findById(id);
    
    if (!ticket) {
      console.log('Ticket not found for ID:', id);
      return NextResponse.json(
        { success: false, message: 'Ticket not found' },
        { status: 404 }
      );
    }
    
    console.log('Ticket found:', ticket.artistName);
    return NextResponse.json(
      { success: true, data: ticket },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    console.log('DELETE API Request received:', { id });

    // Check if ID is provided
    if (!id) {
      console.log('No valid ID provided for DELETE');
      return NextResponse.json(
        { success: false, message: 'Ticket ID is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    console.log('Looking for ticket to delete with ID:', id);
    
    // Find ticket by ID first to get the image public ID
    const ticket = await Ticket.findById(id);
    
    if (!ticket) {
      console.log('Ticket not found for ID:', id);
      return NextResponse.json(
        { success: false, message: 'Ticket not found' },
        { status: 404 }
      );
    }

    // Delete the ticket from database
    await Ticket.findByIdAndDelete(id);
    
    console.log('Ticket deleted successfully:', id);
    return NextResponse.json(
      { success: true, message: 'Ticket deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}