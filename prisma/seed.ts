import { PrismaClient } from '@prisma/client';
import { add } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.itineraryTransfer.deleteMany();
  await prisma.itineraryActivity.deleteMany();
  await prisma.stay.deleteMany();
  await prisma.itineraryDay.deleteMany();
  await prisma.itinerary.deleteMany();
  await prisma.transfer.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.location.deleteMany();

  console.log('Seeding database...');

  // Create locations
  const phuket = await prisma.location.create({
    data: {
      name: 'Phuket',
      region: 'Southern Thailand',
      description: 'Phuket, Thailand\'s largest island, is a tropical paradise known for its stunning beaches, vibrant nightlife, and rich cultural heritage.',
      imageUrl: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg',
    },
  });

  const krabi = await prisma.location.create({
    data: {
      name: 'Krabi',
      region: 'Southern Thailand',
      description: 'Krabi is a coastal province known for its craggy, sheer limestone cliffs, dense mangrove forests, and more than 100 offshore islands.',
      imageUrl: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
    },
  });

  const phiPhi = await prisma.location.create({
    data: {
      name: 'Phi Phi Islands',
      region: 'Southern Thailand',
      description: 'The Phi Phi Islands are an island group in Thailand between the large island of Phuket and the Straits of Malacca coast of Thailand.',
      imageUrl: 'https://images.pexels.com/photos/1268124/pexels-photo-1268124.jpeg',
    },
  });

  // Create hotels
  const phuketHotels = await Promise.all([
    prisma.hotel.create({
      data: {
        name: 'Phuket Beachfront Resort',
        description: 'A luxurious beachfront resort offering stunning views of the Andaman Sea with direct beach access.',
        stars: 5,
        pricePerNight: 250.00,
        imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
        address: '123 Beach Road, Patong, Phuket',
        locationId: phuket.id,
      },
    }),
    prisma.hotel.create({
      data: {
        name: 'Phuket City Hotel',
        description: 'A modern hotel located in the heart of Phuket Town, close to shopping, dining, and cultural attractions.',
        stars: 4,
        pricePerNight: 120.00,
        imageUrl: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
        address: '456 City Center, Phuket Town',
        locationId: phuket.id,
      },
    }),
  ]);

  const krabiHotels = await Promise.all([
    prisma.hotel.create({
      data: {
        name: 'Krabi Cliff Resort',
        description: 'A stunning resort nestled among limestone cliffs with panoramic views of the Andaman Sea.',
        stars: 5,
        pricePerNight: 200.00,
        imageUrl: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
        address: '789 Cliff Drive, Ao Nang, Krabi',
        locationId: krabi.id,
      },
    }),
    prisma.hotel.create({
      data: {
        name: 'Krabi Beachside Hotel',
        description: 'A charming hotel located steps away from Ao Nang Beach with easy access to island hopping tours.',
        stars: 3,
        pricePerNight: 100.00,
        imageUrl: 'https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg',
        address: '101 Beach Road, Ao Nang, Krabi',
        locationId: krabi.id,
      },
    }),
  ]);

  const phiPhiHotels = await Promise.all([
    prisma.hotel.create({
      data: {
        name: 'Phi Phi Island Village',
        description: 'A tranquil beachfront resort offering traditional Thai bungalows in a tropical paradise setting.',
        stars: 4,
        pricePerNight: 180.00,
        imageUrl: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
        address: 'Laem Tong Beach, Phi Phi Islands',
        locationId: phiPhi.id,
      },
    }),
  ]);

  // Create activities
  const phuketActivities = await Promise.all([
    prisma.activity.create({
      data: {
        name: 'Phuket Old Town Walking Tour',
        description: 'Explore the charming streets of Phuket Old Town with its colorful Sino-Portuguese architecture and learn about the island\'s rich history.',
        duration: 180,
        price: 30.00,
        imageUrl: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg',
        locationId: phuket.id,
      },
    }),
    prisma.activity.create({
      data: {
        name: 'Patong Beach Day',
        description: 'Enjoy a day at Phuket\'s most famous beach with options for water sports, beach lounging, and seaside dining.',
        duration: 240,
        price: 25.00,
        imageUrl: 'https://images.pexels.com/photos/1430675/pexels-photo-1430675.jpeg',
        locationId: phuket.id,
      },
    }),
    prisma.activity.create({
      data: {
        name: 'Big Buddha Visit',
        description: 'Visit the iconic 45-meter tall Big Buddha statue sitting atop Nakkerd Hill with panoramic views of the island.',
        duration: 120,
        price: 15.00,
        imageUrl: 'https://images.pexels.com/photos/3659110/pexels-photo-3659110.jpeg',
        locationId: phuket.id,
      },
    }),
  ]);

  const krabiActivities = await Promise.all([
    prisma.activity.create({
      data: {
        name: 'Four Islands Tour',
        description: 'Visit four stunning islands around Krabi: Chicken Island, Tup Island, Poda Island, and Phra Nang Cave Beach.',
        duration: 480,
        price: 60.00,
        imageUrl: 'https://images.pexels.com/photos/2549082/pexels-photo-2549082.jpeg',
        locationId: krabi.id,
      },
    }),
    prisma.activity.create({
      data: {
        name: 'Tiger Cave Temple Hike',
        description: 'Climb 1,260 steps to reach this sacred Buddhist temple with stunning panoramic views of the Krabi countryside.',
        duration: 240,
        price: 20.00,
        imageUrl: 'https://images.pexels.com/photos/3217763/pexels-photo-3217763.jpeg',
        locationId: krabi.id,
      },
    }),
  ]);

  const phiPhiActivities = await Promise.all([
    prisma.activity.create({
      data: {
        name: 'Maya Bay Snorkeling Tour',
        description: 'Snorkel in the crystal-clear waters of the famous Maya Bay, featured in the movie "The Beach".',
        duration: 300,
        price: 50.00,
        imageUrl: 'https://images.pexels.com/photos/1816631/pexels-photo-1816631.jpeg',
        locationId: phiPhi.id,
      },
    }),
    prisma.activity.create({
      data: {
        name: 'Phi Phi Viewpoint Hike',
        description: 'Hike to the famous Phi Phi viewpoint for breathtaking panoramic views of the twin bays.',
        duration: 120,
        price: 10.00,
        imageUrl: 'https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg',
        locationId: phiPhi.id,
      },
    }),
  ]);

  // Create transfers
  const transfers = await Promise.all([
    prisma.transfer.create({
      data: {
        type: 'Ferry',
        duration: 120,
        price: 25.00,
        originLocationId: phuket.id,
        destinationLocationId: phiPhi.id,
        description: 'Ferry transfer from Phuket to Phi Phi Islands.',
      },
    }),
    prisma.transfer.create({
      data: {
        type: 'Ferry',
        duration: 120,
        price: 25.00,
        originLocationId: phiPhi.id,
        destinationLocationId: phuket.id,
        description: 'Ferry transfer from Phi Phi Islands to Phuket.',
      },
    }),
    prisma.transfer.create({
      data: {
        type: 'Van',
        duration: 180,
        price: 30.00,
        originLocationId: phuket.id,
        destinationLocationId: krabi.id,
        description: 'Van transfer from Phuket to Krabi.',
      },
    }),
    prisma.transfer.create({
      data: {
        type: 'Airport Transfer',
        duration: 60,
        price: 20.00,
        originLocationId: phuket.id,
        destinationLocationId: phuket.id,
        description: 'Airport transfer in Phuket.',
      },
    }),
  ]);

  // Create itineraries for different durations
  const durations = [2, 3, 5, 7];
  const startDate = new Date();

  for (const duration of durations) {
    const title = `${duration}-Night Thailand Adventure`;
    const description = `Experience the best of Thailand in this ${duration}-night journey through beautiful destinations.`;
    const basePrice = duration * 200; // Base price calculation

    const itinerary = await prisma.itinerary.create({
      data: {
        title,
        description,
        duration,
        totalPrice: basePrice,
        isRecommended: true,
      },
    });

    // Create days for each itinerary
    for (let dayNumber = 1; dayNumber <= duration; dayNumber++) {
      const dayDate = add(startDate, { days: dayNumber - 1 });
      
      // Alternate between locations based on duration
      const location = dayNumber <= 2 ? phuket :
                      dayNumber <= 4 ? phiPhi :
                      krabi;
      
      const hotel = location.id === phuket.id ? phuketHotels[0] :
                    location.id === phiPhi.id ? phiPhiHotels[0] :
                    krabiHotels[0];

      const activities = location.id === phuket.id ? phuketActivities :
                        location.id === phiPhi.id ? phiPhiActivities :
                        krabiActivities;

      const day = await prisma.itineraryDay.create({
        data: {
          dayNumber,
          date: dayDate,
          description: `Day ${dayNumber} - Exploring ${location.name}`,
          itineraryId: itinerary.id,
          locationId: location.id,
        },
      });

      // Add stay
      await prisma.stay.create({
        data: {
          checkIn: add(dayDate, { hours: 14 }),
          checkOut: add(dayDate, { days: 1, hours: 12 }),
          hotelId: hotel.id,
          itineraryDayId: day.id,
        },
      });

      // Add activities
      await prisma.itineraryActivity.create({
        data: {
          startTime: add(dayDate, { hours: 9 }),
          activityId: activities[0].id,
          itineraryDayId: day.id,
        },
      });

      if (activities.length > 1) {
        await prisma.itineraryActivity.create({
          data: {
            startTime: add(dayDate, { hours: 14 }),
            activityId: activities[1].id,
            itineraryDayId: day.id,
          },
        });
      }

      // Add transfers for first and last day
      if (dayNumber === 1) {
        await prisma.itineraryTransfer.create({
          data: {
            startTime: add(dayDate, { hours: 8 }),
            transferId: transfers[3].id,
            itineraryDayId: day.id,
          },
        });
      }
    }
  }

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });