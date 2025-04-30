# Thailand Travel Itinerary App

A modern web application to explore and create curated travel itineraries for Thailand, featuring popular destinations like Phuket, Krabi, and the Phi Phi Islands. Designed with Next.js, TypeScript, Tailwind CSS, and Prisma, this app offers a seamless experience to browse ready-made trips or design your own custom adventure.

---

## Features

- Browse popular and recommended travel itineraries for Southern Thailand.
- View detailed itinerary information including daily activities, stays, and transfers.
- Create custom itineraries with flexible trip duration, start dates, and pricing.
- Responsive and accessible UI built with Radix UI components and Tailwind CSS.
- Backend powered by Next.js API routes and Prisma ORM with PostgreSQL.
- Real-time form validation and user-friendly notifications.

---

## Tech Stack

- **Framework:** Next.js 13 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Radix UI
- **Database:** PostgreSQL with Prisma ORM
- **Form Handling:** react-hook-form, Zod validation
- **API:** Next.js API Routes (REST)
- **Utilities:** date-fns, lucide-react icons, framer-motion animations

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following:

   ```
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Run Prisma migrations and generate client:

   ```bash
   npm i prisma
   npx prisma generate
   npx prisma migrate dev --name <nameofyourchoice>
   ```

5. Seed the database with initial data:

   ```bash
   npx prisma db seed
   ```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## Usage

- **Home Page:** Overview of featured destinations and popular itineraries.
- **Browse Itineraries:** View a list of curated itineraries with filters.
- **Itinerary Details:** Detailed view of each itinerary including daily plans.
- **Create Itinerary:** Form to create a custom itinerary with validation and submission.

---

## API Endpoints

- `GET /api/itineraries` - Fetch all itineraries, supports optional `duration` query param.
- `POST /api/itineraries` - Create a new itinerary with nested days, stays, activities, and transfers.
- `GET /api/itineraries/[id]` - Fetch detailed itinerary by ID.


---

## Project Structure

```
/app
  /api
    /itineraries
      route.ts           # API routes for itineraries
    /itineraries/[id]
      route.ts           # API routes for single itinerary
  /create
    page.tsx            # Create itinerary page
  /itineraries
    page.tsx            # Itineraries list page
    /[id]
      page.tsx          # Itinerary details page
/components
  itinerary-list.tsx    # List component for itineraries
  create-itinerary-form.tsx  # Form component for creating itineraries
  ...                   # Other UI components and Radix UI wrappers
/prisma
  schema.prisma         # Prisma schema and data models
  seed.ts               # Database seeding script
/lib
  db.ts                 # Prisma client instance
/hooks
  use-toast.ts          # Toast notification hook
/package.json           # Project metadata and scripts
/next.config.js         # Next.js configuration
/tailwind.config.ts     # Tailwind CSS configuration
/tsconfig.json          # TypeScript configuration
```

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for bug fixes, features, or improvements.

---

## License

This project is private. Please contact the owner for licensing information.
