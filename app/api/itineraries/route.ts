import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// GET /api/itineraries - Get all itineraries with optional duration filter
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const duration = url.searchParams.get('duration');
    
    let query = {};
    
    // Filter by duration if provided
    if (duration) {
      query = {
        where: {
          duration: parseInt(duration)
        }
      };
    }
    
    // Get itineraries with basic information
    const itineraries = await db.itinerary.findMany({
      ...query,
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        totalPrice: true,
        isRecommended: true,
        createdAt: true,
        updatedAt: true,
        days: {
          select: {
            location: {
              select: {
                name: true,
                imageUrl: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(itineraries, { status: 200 });
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch itineraries' },
      { status: 500 }
    );
  }
}

// POST /api/itineraries - Create a new itinerary
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Basic validation
    if (!body.title || !body.description || !body.duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create the new itinerary
    const newItinerary = await db.itinerary.create({
      data: {
        title: body.title,
        description: body.description,
        duration: body.duration,
        totalPrice: body.totalPrice || 0,
        isRecommended: body.isRecommended || false,
      }
    });
    
    // If days are provided, create the itinerary days
    if (body.days && body.days.length > 0) {
      for (const day of body.days) {
        const newDay = await db.itineraryDay.create({
          data: {
            dayNumber: day.dayNumber,
            date: day.date ? new Date(day.date) : undefined,
            description: day.description,
            itineraryId: newItinerary.id,
            locationId: day.locationId,
          }
        });
        
        // Add stay if provided
        if (day.stay) {
          await db.stay.create({
            data: {
              checkIn: new Date(day.stay.checkIn),
              checkOut: new Date(day.stay.checkOut),
              hotelId: day.stay.hotelId,
              itineraryDayId: newDay.id,
            }
          });
        }
        
        // Add activities if provided
        if (day.activities && day.activities.length > 0) {
          for (const activity of day.activities) {
            await db.itineraryActivity.create({
              data: {
                startTime: new Date(activity.startTime),
                activityId: activity.activityId,
                itineraryDayId: newDay.id,
              }
            });
          }
        }
        
        // Add transfers if provided
        if (day.transfers && day.transfers.length > 0) {
          for (const transfer of day.transfers) {
            await db.itineraryTransfer.create({
              data: {
                startTime: new Date(transfer.startTime),
                transferId: transfer.transferId,
                itineraryDayId: newDay.id,
              }
            });
          }
        }
      }
    }
    
    return NextResponse.json(newItinerary, { status: 201 });
  } catch (error) {
    console.error('Error creating itinerary:', error);
    return NextResponse.json(
      { error: 'Failed to create itinerary' },
      { status: 500 }
    );
  }
}