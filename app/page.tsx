import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, TreePalm as PalmTree } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg" 
            alt="Thailand beach"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl space-y-5">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Discover Thailand's Beauty
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Explore curated travel itineraries through Phuket, Krabi, and the Phi Phi Islands.
              Your dream Thai vacation is just a few clicks away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/itineraries">
                  Browse Itineraries
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10" asChild>
                <Link href="/create">
                  Create Custom Trip
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured destinations */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Featured Destinations</h2>
            <p className="text-muted-foreground mt-2">Explore Thailand's most beautiful regions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phuket card */}
            <div className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] w-full relative">
                <Image 
                  src="https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg"
                  alt="Phuket"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-0 w-full p-5 text-white">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 mr-1 opacity-80" />
                    <span className="text-sm font-medium">Southern Thailand</span>
                  </div>
                  <h3 className="text-xl font-bold">Phuket</h3>
                  <p className="mt-1 text-sm line-clamp-2">
                    Thailand's largest island, known for stunning beaches, vibrant nightlife, and rich culture.
                  </p>
                </div>
              </div>
            </div>

            {/* Krabi card */}
            <div className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] w-full relative">
                <Image 
                  src="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg"
                  alt="Krabi"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-0 w-full p-5 text-white">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 mr-1 opacity-80" />
                    <span className="text-sm font-medium">Southern Thailand</span>
                  </div>
                  <h3 className="text-xl font-bold">Krabi</h3>
                  <p className="mt-1 text-sm line-clamp-2">
                    Coastal province known for limestone cliffs, mangrove forests, and beautiful islands.
                  </p>
                </div>
              </div>
            </div>

            {/* Phi Phi Islands card */}
            <div className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] w-full relative">
                <Image 
                  src="https://images.pexels.com/photos/1268124/pexels-photo-1268124.jpeg"
                  alt="Phi Phi Islands"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-0 w-full p-5 text-white">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 mr-1 opacity-80" />
                    <span className="text-sm font-medium">Southern Thailand</span>
                  </div>
                  <h3 className="text-xl font-bold">Phi Phi Islands</h3>
                  <p className="mt-1 text-sm line-clamp-2">
                    Stunning island group with crystal clear waters, perfect for diving and snorkeling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured itineraries */}
      <section className="py-16 bg-muted/40">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Popular Itineraries</h2>
            <p className="text-muted-foreground mt-2">Ready-made trips designed by travel experts</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 3-Night Phuket Adventure */}
            <div className="bg-card rounded-lg overflow-hidden shadow transition-all hover:shadow-lg">
              <div className="aspect-[3/2] relative">
                <Image 
                  src="https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg"
                  alt="Phuket Beach"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                  Popular
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-muted-foreground text-sm mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>3 Nights</span>
                  <span className="mx-2">•</span>
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Phuket</span>
                </div>
                <h3 className="text-xl font-bold mb-2">3-Night Phuket Adventure</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  A short but sweet adventure in Phuket with beach time, culture, and local experiences.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold">$620</span>
                    <span className="text-muted-foreground text-sm"> / person</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/itineraries/3-night-phuket">View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* 5-Night Phuket & Phi Phi */}
            <div className="bg-card rounded-lg overflow-hidden shadow transition-all hover:shadow-lg">
              <div className="aspect-[3/2] relative">
                <Image 
                  src="https://images.pexels.com/photos/1268124/pexels-photo-1268124.jpeg"
                  alt="Phi Phi Island"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                  Best Seller
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-muted-foreground text-sm mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>5 Nights</span>
                  <span className="mx-2">•</span>
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Phuket, Phi Phi</span>
                </div>
                <h3 className="text-xl font-bold mb-2">5-Night Phuket & Phi Phi</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  Experience the best of Phuket and the beautiful Phi Phi Islands in this 5-night adventure.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold">$1,050</span>
                    <span className="text-muted-foreground text-sm"> / person</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/itineraries/5-night-phuket-phi-phi">View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* 7-Night Thailand Highlights */}
            <div className="bg-card rounded-lg overflow-hidden shadow transition-all hover:shadow-lg">
              <div className="aspect-[3/2] relative">
                <Image 
                  src="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg"
                  alt="Krabi"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                  Featured
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-muted-foreground text-sm mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>7 Nights</span>
                  <span className="mx-2">•</span>
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Phuket, Phi Phi, Krabi</span>
                </div>
                <h3 className="text-xl font-bold mb-2">7-Night Thailand Highlights</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  The ultimate week-long tour covering all the highlights of Southern Thailand.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold">$1,500</span>
                    <span className="text-muted-foreground text-sm"> / person</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/itineraries/7-night-thailand-highlights">View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link href="/itineraries">
                View All Itineraries
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Why choose us */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose Us</h2>
            <p className="text-muted-foreground mt-2">Benefits of booking with Thailand Travel</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-5">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <PalmTree className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Local Expertise</h3>
              <p className="text-muted-foreground text-sm">
                Our team has extensive knowledge of Thailand's best destinations.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-5">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Customized Itineraries</h3>
              <p className="text-muted-foreground text-sm">
                Tailor your trip to match your preferences and travel style.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-5">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-sm">
                We're available around the clock to assist with any travel needs.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-5">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Exclusive Access</h3>
              <p className="text-muted-foreground text-sm">
                Enjoy special rates and access to unique experiences.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}