import { Timestamp } from '@angular/fire/firestore';

export interface Job {
  id?: string;
  title: string;
  company: string;
  country: string;
  category: string;
  salary: string;
  experience: string;
  deadline: Timestamp | string;
  description: string;
  requirements: string[];
  logo: string;
  featured: boolean;
  createdAt?: Timestamp;
}

export interface JobApplication {
  jobId: string;
  jobTitle: string;
  name: string;
  phone: string;
  email: string;
  experience: number;
  coverLetter?: string;
  cvUrl?: string;
  appliedAt?: Timestamp;
}

export interface JobFilter {
  countries: string[];
  categories: string[];
  experience: string[];
}
