import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { MapPin, Calendar, DollarSign, Clock, ArrowLeft, Hotel, Map, TreePalm as PalmTree, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ItineraryTimeline } from '@/components/itinerary-timeline';

// This would typically fetch data from the API
async function getItinerary(id: string) {
  // For demo purposes, return mock data for id "1"
  // In a real app, this would fetch from the API using the ID
  return {
    id: id,
    title: '3-Night Phuket Adventure',
    description: 'A short but sweet adventure in Phuket with beach time, culture, and local experiences. Explore the beautiful beaches, vibrant markets, and cultural landmarks of Thailand\'s largest island.',
    duration: 3,
    totalPrice: 620,
    isRecommended: true,
    imageUrl: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg',
    days: [
      {
        id: 'd1',
        dayNumber: 1,
        description: 'Arrival and relaxation in Phuket',
        date: new Date().toISOString(),
        location: {
          name: 'Phuket',
          imageUrl: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg'
        },
        stay: {
          hotel: {
            name: 'Phuket Beachfront Resort',
            stars: 5,
            imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg'
          }
        },
        activities: [
          {
            activity: {
              name: 'Patong Beach Day',
              description: 'Enjoy a day at Phuket\'s most famous beach with options for water sports, beach lounging, and seaside dining.',
              duration: 240,
              imageUrl: 'https://images.pexels.com/photos/1430675/pexels-photo-1430675.jpeg'
            },
            startTime: new Date(new Date().setHours(16, 0)).toISOString()
          }
        ],
        transfers: [
          {
            transfer: {
              type: 'Airport Transfer',
              duration: 60,
              originLocation: { name: 'Phuket Airport' },
              destinationLocation: { name: 'Phuket Beachfront Resort' }
            },
            startTime: new Date(new Date().setHours(12, 0)).toISOString()
          }
        ]
      },
      {
        id: 'd2',
        dayNumber: 2,
        description: 'Cultural exploration in Phuket',
        date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        location: {
          name: 'Phuket',
          imageUrl: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg'
        },
        stay: {
          hotel: {
            name: 'Phuket Beachfront Resort',
            stars: 5,
            imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg'
          }
        },
        activities: [
          {
            activity: {
              name: 'Phuket Old Town Walking Tour',
              description: 'Explore the charming streets of Phuket Old Town with its colorful Sino-Portuguese architecture and learn about the island\'s rich history.',
              duration: 180,
              imageUrl: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg'
            },
            startTime: new Date(new Date().setHours(9, 0)).toISOString()
          },
          {
            activity: {
              name: 'Big Buddha Visit',
              description: 'Visit the iconic 45-meter tall Big Buddha statue sitting atop Nakkerd Hill with panoramic views of the island.',
              duration: 120,
              imageUrl: 'https://images.pexels.com/photos/3659110/pexels-photo-3659110.jpeg'
            },
            startTime: new Date(new Date().setHours(15, 0)).toISOString()
          }
        ],
        transfers: []
      },
      {
        id: 'd3',
        dayNumber: 3,
        description: 'Beach day and farewell',
        date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
        location: {
          name: 'Phuket',
          imageUrl: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg'
        },
        stay: {
          hotel: {
            name: 'Phuket Beachfront Resort',
            stars: 5,
            imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg'
          }
        },
        activities: [
          {
            activity: {
              name: 'Patong Beach Day',
              description: 'Enjoy a day at Phuket\'s most famous beach with options for water sports, beach lounging, and seaside dining.',
              duration: 240,
              imageUrl: 'https://images.pexels.com/photos/1430675/pexels-photo-1430675.jpeg'
            },
            startTime: new Date(new Date().setHours(10, 0)).toISOString()
          }
        ],
        transfers: [
          {
            transfer: {
              type: 'Airport Transfer',
              duration: 60,
              originLocation: { name: 'Phuket Beachfront Resort' },
              destinationLocation: { name: 'Phuket Airport' }
            },
            startTime: new Date(new Date().setHours(16, 0)).toISOString()
          }
        ]
      }
    ]
  };
}

export default function ItineraryPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-10">
      <Link 
        href="/itineraries"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to itineraries
      </Link>
      
      <Suspense fallback={<ItineraryDetailSkeleton />}>
        <ItineraryDetail id={params.id} />
      </Suspense>
    </div>
  );
}

async function ItineraryDetail({ id }: { id: string }) {
  const itinerary = await getItinerary(id);
  
  return (
    <div>
      <div className="relative rounded-lg overflow-hidden h-64 md:h-96 mb-8">
        <Image
          src={itinerary.imageUrl}
          alt={itinerary.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {itinerary.title}
          </h1>
          <div className="flex flex-wrap gap-4 mt-4 text-white">
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              <span>{itinerary.duration} nights</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              <span>{itinerary.days[0].location.name}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5" />
              <span>${itinerary.totalPrice} per person</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground">
              {itinerary.description}
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="flex flex-col items-center bg-muted/40 rounded-lg p-4">
                <Clock className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="font-medium">{itinerary.duration} Nights</span>
              </div>
              <div className="flex flex-col items-center bg-muted/40 rounded-lg p-4">
                <Hotel className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-muted-foreground">Accommodations</span>
                <span className="font-medium">{itinerary.duration} Nights</span>
              </div>
              <div className="flex flex-col items-center bg-muted/40 rounded-lg p-4">
                <PalmTree className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-muted-foreground">Activities</span>
                <span className="font-medium">
                  {itinerary.days.reduce((acc, day) => acc + day.activities.length, 0)}
                </span>
              </div>
              <div className="flex flex-col items-center bg-muted/40 rounded-lg p-4">
                <Car className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-muted-foreground">Transfers</span>
                <span className="font-medium">
                  {itinerary.days.reduce((acc, day) => acc + day.transfers.length, 0)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg border p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Daily Itinerary</h2>
            <Tabs defaultValue="1">
              <TabsList className="mb-6">
                {itinerary.days.map((day) => (
                  <TabsTrigger key={day.id} value={day.dayNumber.toString()}>
                    Day {day.dayNumber}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {itinerary.days.map((day) => (
                <TabsContent key={day.id} value={day.dayNumber.toString()}>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{day.description}</h3>
                      <Badge variant="outline">
                        {format(new Date(day.date), 'PPP')}
                      </Badge>
                    </div>
                    
                    <ItineraryTimeline day={day} />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border p-6 mb-8 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>
            
            <div className="border-t border-b py-4 my-4">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Base price:</span>
                <span>${itinerary.totalPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Taxes & fees:</span>
                <span>$50</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total:</span>
                <span>${itinerary.totalPrice + 50}</span>
              </div>
            </div>
            
            <Button className="w-full mb-3">Book Now</Button>
            <Button variant="outline" className="w-full">Save to Wishlist</Button>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Need help?</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Have questions about this itinerary? Our travel experts are here to help.
              </p>
              <Button variant="link" className="p-0 h-auto text-sm">Contact us</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ItineraryDetailSkeleton() {
  return (
    <div>
      <div className="relative rounded-lg overflow-hidden h-64 md:h-96 mb-8 bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
          <Skeleton className="h-10 w-2/3 bg-white/20" />
          <div className="flex flex-wrap gap-4 mt-4">
            <Skeleton className="h-6 w-24 bg-white/20" />
            <Skeleton className="h-6 w-24 bg-white/20" />
            <Skeleton className="h-6 w-32 bg-white/20" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border p-6 mb-8">
            <Skeleton className="h-8 w-40 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
            
            <div className="grid grid-cols-4 gap-4 mt-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          </div>
          
          <div className="bg-card rounded-lg border p-6">
            <Skeleton className="h-8 w-40 mb-4" />
            <div className="flex gap-2 mb-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-16" />
              ))}
            </div>
            
            <Skeleton className="h-6 w-40 mb-4" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            
            <div className="border-t border-b py-4 my-4">
              <div className="flex justify-between mb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between mb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between mt-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
            
            <Skeleton className="h-10 w-full mb-3" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}