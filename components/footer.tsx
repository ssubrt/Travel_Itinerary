import { TreePalm as PalmTree } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <PalmTree className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Thailand Travel</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your ultimate guide to exploring the beautiful destinations of Thailand.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Quick Links</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Home</li>
              <li className="text-sm text-muted-foreground">Itineraries</li>
              <li className="text-sm text-muted-foreground">Create Itinerary</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Destinations</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Phuket</li>
              <li className="text-sm text-muted-foreground">Krabi</li>
              <li className="text-sm text-muted-foreground">Phi Phi Islands</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Legal</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Terms of Service</li>
              <li className="text-sm text-muted-foreground">Privacy Policy</li>
              <li className="text-sm text-muted-foreground">Cookie Policy</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Thailand Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}