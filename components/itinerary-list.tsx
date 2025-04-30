'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, DollarSign, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

async function fetchItineraries(query: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/itineraries?${query}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch itineraries');
  return res.json();
}

export function ItineraryList() {
  const searchParams = useSearchParams();
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = searchParams.toString();
        const data = await fetchItineraries(query);
        setItineraries(data);
      } catch (err) {
        setError('Failed to fetch itineraries');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (loading) {
    return <ItineraryListSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-red-500">{error}</h3>
      </div>
    );
  }

  if (itineraries.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No itineraries found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters or browse all itineraries</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {itineraries.map((itinerary: any) => (
        <ItineraryCard key={itinerary.id} itinerary={itinerary} />
      ))}
    </div>
  );
}

function ItineraryListSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-40 w-full sm:w-56 rounded-md" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-9 w-28" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ItineraryCard({ itinerary }: { itinerary: any }) {
  const locations = itinerary.days.map((day: any) => day.location.name)
    .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);

  const mainImage = itinerary.days[0]?.location?.imageUrl ||
    'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg';

  return (
    <div className="border rounded-lg overflow-hidden transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-48 sm:h-auto sm:w-56">
          <Image
            src={mainImage}
            alt={itinerary.title}
            fill
            className="object-cover"
          />
          {itinerary.isRecommended && (
            <Badge className="absolute top-2 left-2 bg-primary">
              Recommended
            </Badge>
          )}
        </div>

        <div className="flex-1 p-5">
          <div className="flex flex-wrap gap-2 mb-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{itinerary.duration} nights</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{locations.join(', ')}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>Available year-round</span>
            </div>
          </div>

          <h2 className="text-xl font-bold">{itinerary.title}</h2>

          <p className="mt-2 text-muted-foreground line-clamp-2">
            {itinerary.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg">${itinerary.totalPrice}</span>
              <span className="text-muted-foreground text-sm ml-1">/ person</span>
            </div>

            <Button asChild>
              <Link href={`/itineraries/${itinerary.id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}