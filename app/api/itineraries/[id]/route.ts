import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// GET /api/itineraries/[id] - Get a specific itinerary by ID with full details
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Get the itinerary with all related details
    const itinerary = await db.itinerary.findUnique({
      where: { id },
      include: {
        days: {
          orderBy: {
            dayNumber: 'asc'
          },
          include: {
            location: true,
            stay: {
              include: {
                hotel: true
              }
            },
            activities: {
              include: {
                activity: true
              },
              orderBy: {
                startTime: 'asc'
              }
            },
            transfers: {
              include: {
                transfer: {
                  include: {
                    originLocation: true,
                    destinationLocation: true
                  }
                }
              },
              orderBy: {
                startTime: 'asc'
              }
            }
          }
        }
      }
    });
    
    if (!itinerary) {
      return NextResponse.json(
        { error: 'Itinerary not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(itinerary, { status: 200 });
  } catch (error) {
    console.error('Error fetching itinerary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch itinerary' },
      { status: 500 }
    );
  }
}

// PUT /api/itineraries/[id] - Update an existing itinerary
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();
    
    // Check if the itinerary exists
    const existingItinerary = await db.itinerary.findUnique({
      where: { id }
    });
    
    if (!existingItinerary) {
      return NextResponse.json(
        { error: 'Itinerary not found' },
        { status: 404 }
      );
    }
    
    // Update the itinerary
    const updatedItinerary = await db.itinerary.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        duration: body.duration,
        totalPrice: body.totalPrice,
        isRecommended: body.isRecommended,
      }
    });
    
    return NextResponse.json(updatedItinerary, { status: 200 });
  } catch (error) {
    console.error('Error updating itinerary:', error);
    return NextResponse.json(
      { error: 'Failed to update itinerary' },
      { status: 500 }
    );
  }
}

// DELETE /api/itineraries/[id] - Delete an itinerary
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if the itinerary exists
    const existingItinerary = await db.itinerary.findUnique({
      where: { id }
    });
    
    if (!existingItinerary) {
      return NextResponse.json(
        { error: 'Itinerary not found' },
        { status: 404 }
      );
    }
    
    // Delete the itinerary (cascade delete will remove related records)
    await db.itinerary.delete({
      where: { id }
    });
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting itinerary:', error);
    return NextResponse.json(
      { error: 'Failed to delete itinerary' },
      { status: 500 }
    );
  }
}