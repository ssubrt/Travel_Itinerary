import { Suspense } from 'react';
import { ItineraryList } from '@/components/itinerary-list';
import { ItineraryFilter } from '@/components/itinerary-filter';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
  title: 'Itineraries | Thailand Travel',
  description: 'Browse our curated Thailand travel itineraries for your next adventure',
};

export default function ItinerariesPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Browse Itineraries</h1>
        <p className="text-muted-foreground">
          Discover our expertly crafted travel itineraries for exploring Thailand s beautiful destinations.
        </p>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <ItineraryFilter />
        </div>
        <div className="md:col-span-3">
          <Suspense fallback={<ItineraryListSkeleton />}>
            <ItineraryList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function ItineraryListSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: Array.length }).map((_, i) => (
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