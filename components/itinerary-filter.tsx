'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function ItineraryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get the initial values from URL search params
  const initialDuration = searchParams.get('duration') ? parseInt(searchParams.get('duration')!) : undefined;
  const initialDestination = searchParams.get('destination') || undefined;
  
  const [duration, setDuration] = useState<number | undefined>(initialDuration);
  const [destination, setDestination] = useState<string | undefined>(initialDestination);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [budget, setBudget] = useState<number[]>([0, 2000]);
  
  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (duration) params.set('duration', duration.toString());
    if (destination) params.set('destination', destination);
    
    router.push(`/itineraries?${params.toString()}`);
  };
  
  // Reset filters
  const resetFilters = () => {
    setDuration(undefined);
    setDestination(undefined);
    setDate(undefined);
    setBudget([0, 2000]);
    router.push('/itineraries');
  };
  
  return (
    <div className="bg-card rounded-lg border p-5 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          Filters
        </h2>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Reset
        </Button>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-6">
        {/* Duration filter */}
        <div>
          <h3 className="font-medium mb-3">Trip Duration</h3>
          <RadioGroup 
            value={duration?.toString()} 
            onValueChange={(value) => setDuration(parseInt(value))}
          >
            {[2, 3, 5, 7].map((days) => (
              <div key={days} className="flex items-center space-x-2">
                <RadioGroupItem value={days.toString()} id={`duration-${days}`} />
                <Label htmlFor={`duration-${days}`}>{days} nights</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <Separator />
        
        
        <Button className="w-full" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}