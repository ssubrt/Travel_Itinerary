import { CreateItineraryForm } from '@/components/create-itinerary-form';

export const metadata = {
  title: 'Create Itinerary | Thailand Travel',
  description: 'Create your custom Thailand travel itinerary',
};

export default function CreatePage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Create Custom Itinerary</h1>
        <p className="text-muted-foreground mb-8">
          Design your perfect Thailand adventure by filling out the form below.
        </p>
        <CreateItineraryForm />
      </div>
    </div>
  );
}