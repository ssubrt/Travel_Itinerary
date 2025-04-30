'use client';

import { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Hotel, Car, TreePalm as PalmTree, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ItineraryTimeline({ day }: { day: any }) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  const toggleItem = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };
  
  // Combine all activities and transfers, sorted by time
  const timelineItems = [
    ...day.transfers.map((t: any) => ({
      id: `transfer-${t.startTime}`,
      type: 'transfer',
      time: new Date(t.startTime),
      data: t.transfer,
    })),
    ...day.activities.map((a: any) => ({
      id: `activity-${a.startTime}`,
      type: 'activity',
      time: new Date(a.startTime),
      data: a.activity,
    })),
  ].sort((a, b) => a.time.getTime() - b.time.getTime());
  
  // Add hotel stay at the beginning
  if (day.stay) {
    timelineItems.unshift({
      id: 'hotel-stay',
      type: 'hotel',
      time: new Date(day.date),
      data: day.stay.hotel,
    });
  }
  
  return (
    <div className="space-y-4">
      {timelineItems.map((item, index) => (
        <div key={item.id} className="relative">
          {/* Timeline line */}
          {index < timelineItems.length - 1 && (
            <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-muted-foreground/20 z-0" />
          )}
          
          <TimelineItem 
            item={item} 
            isExpanded={expandedItem === item.id}
            onToggle={() => toggleItem(item.id)}
          />
        </div>
      ))}
    </div>
  );
}

function TimelineItem({ 
  item, 
  isExpanded, 
  onToggle 
}: { 
  item: any; 
  isExpanded: boolean; 
  onToggle: () => void; 
}) {
  return (
    <div className="flex items-start gap-4">
      {/* Icon */}
      <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
        {item.type === 'hotel' && <Hotel className="h-6 w-6 text-primary" />}
        {item.type === 'transfer' && <Car className="h-6 w-6 text-primary" />}
        {item.type === 'activity' && <PalmTree className="h-6 w-6 text-primary" />}
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <div 
          onClick={onToggle}
          className="flex items-center justify-between bg-card border rounded-lg p-4 cursor-pointer hover:bg-muted/40 transition-colors"
        >
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              {item.type === 'hotel' ? 'Accommodation' : 
               item.type === 'transfer' ? 'Transfer' : 'Activity'}
               
              {item.type !== 'hotel' && (
                <span className="ml-2">
                  {format(item.time, 'h:mm a')}
                </span>
              )}
            </div>
            <h4 className="font-semibold">{item.data.name}</h4>
          </div>
          <div>
            {isExpanded ? 
              <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            }
          </div>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className={cn(
                "mt-2 p-4 bg-muted/40 rounded-lg",
                "border border-dashed"
              )}>
                {item.type === 'hotel' && (
                  <HotelDetails hotel={item.data} />
                )}
                
                {item.type === 'transfer' && (
                  <TransferDetails transfer={item.data} />
                )}
                
                {item.type === 'activity' && (
                  <ActivityDetails activity={item.data} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function HotelDetails({ hotel }: { hotel: any }) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative w-full md:w-32 h-24 md:h-32 rounded-lg overflow-hidden">
        <Image
          src={hotel.imageUrl}
          alt={hotel.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-medium mb-1">{hotel.name}</h4>
        <div className="flex items-center text-amber-500 mb-2">
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Luxurious accommodation with stunning views and excellent amenities.
        </p>
      </div>
    </div>
  );
}

function TransferDetails({ transfer }: { transfer: any }) {
  return (
    <div>
      <div className="flex items-center mb-2">
        <span className="font-medium">{transfer.type}</span>
        <span className="mx-2">•</span>
        <span className="text-sm text-muted-foreground">
          {Math.floor(transfer.duration / 60)}h {transfer.duration % 60}m
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="text-sm font-medium">From</div>
          <div>{transfer.originLocation.name}</div>
        </div>
        <div className="text-muted-foreground">→</div>
        <div className="flex-1">
          <div className="text-sm font-medium">To</div>
          <div>{transfer.destinationLocation.name}</div>
        </div>
      </div>
    </div>
  );
}

function ActivityDetails({ activity }: { activity: any }) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative w-full md:w-32 h-24 md:h-32 rounded-lg overflow-hidden">
        <Image
          src={activity.imageUrl}
          alt={activity.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-medium mb-1">{activity.name}</h4>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <span>{Math.floor(activity.duration / 60)}h {activity.duration % 60}m</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {activity.description}
        </p>
      </div>
    </div>
  );
}