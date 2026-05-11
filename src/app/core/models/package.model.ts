import { Timestamp } from '@angular/fire/firestore';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export type PackageType = 'umrah';
export type PackageTier = 'Economy' | 'Standard' | 'Premium' | 'VIP';

export interface Package {
  id?: string;
  title: string;
  type: PackageType;
  tier?: PackageTier;
  price: number;
  duration: string;
  departure: string;
  departureDate: Timestamp | string;
  seats: number;
  includes: string[];
  excludes: string[];
  itinerary: ItineraryDay[];
  images: string[];
  featured: boolean;
  groupLeader?: string;
  createdAt?: Timestamp;
}

export interface PackageFilter {
  priceRange?: 'under2000' | '2000-4000' | 'over4000' | 'under5000' | '5000-8000' | 'over8000' | '';
  duration?: string;
  departure?: string;
  tier?: PackageTier | '';
}
