import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// GET /api/recommended - MCP server for recommended itineraries by duration
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const nights = url.searchParams.get('nights');
    
    // Validate nights parameter
    if (!nights) {
      return NextResponse.json(
        { error: 'Missing nights parameter' },
        { status: 400 }
      );
    }
    
    const duration = parseInt(nights);
    
    // Validate duration is a valid number
    if (isNaN(duration) || duration < 2 || duration > 8) {
      return NextResponse.json(
        { error: 'Night parameter must be a number between 2 and 8' },
        { status: 400 }
      );
    }
    
    // Find recommended itineraries that match the requested duration
    const exactMatches = await db.itinerary.findMany({
      where: {
        duration: duration,
        isRecommended: true
      },
      include: {
        days: {
          select: {
            dayNumber: true,
            description: true,
            location: {
              select: {
                name: true,
                region: true,
                imageUrl: true
              }
            },
            stay: {
              select: {
                hotel: {
                  select: {
                    name: true,
                    stars: true,
                    pricePerNight: true,
                    imageUrl: true
                  }
                }
              }
            }
          },
          orderBy: {
            dayNumber: 'asc'
          }
        }
      }
    });
    
    // If we have exact matches, return them
    if (exactMatches.length > 0) {
      return NextResponse.json({
        requested_nights: duration,
        itineraries: exactMatches
      }, { status: 200 });
    }
    
    // If no exact matches, find the closest matches (±1 day)
    const closestMatches = await db.itinerary.findMany({
      where: {
        duration: {
          in: [duration - 1, duration + 1]
        },
        isRecommended: true
      },
      include: {
        days: {
          select: {
            dayNumber: true,
            description: true,
            location: {
              select: {
                name: true,
                region: true,
                imageUrl: true
              }
            },
            stay: {
              select: {
                hotel: {
                  select: {
                    name: true,
                    stars: true,
                    pricePerNight: true,
                    imageUrl: true
                  }
                }
              }
            }
          },
          orderBy: {
            dayNumber: 'asc'
          }
        }
      }
    });
    
    // If we have close matches, return them with a note
    if (closestMatches.length > 0) {
      return NextResponse.json({
        requested_nights: duration,
        message: `No exact matches for ${duration} nights. Showing closest options.`,
        itineraries: closestMatches
      }, { status: 200 });
    }
    
    // If still no matches, return any recommended itineraries
    const anyRecommended = await db.itinerary.findMany({
      where: {
        isRecommended: true
      },
      take: 3,
      include: {
        days: {
          select: {
            dayNumber: true,
            description: true,
            location: {
              select: {
                name: true,
                region: true,
                imageUrl: true
              }
            },
            stay: {
              select: {
                hotel: {
                  select: {
                    name: true,
                    stars: true,
                    pricePerNight: true,
                    imageUrl: true
                  }
                }
              }
            }
          },
          orderBy: {
            dayNumber: 'asc'
          }
        }
      }
    });
    
    return NextResponse.json({
      requested_nights: duration,
      message: `No close matches for ${duration} nights. Showing alternative recommendations.`,
      itineraries: anyRecommended
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching recommended itineraries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommended itineraries' },
      { status: 500 }
    );
  }
}