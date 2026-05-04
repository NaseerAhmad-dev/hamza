import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Job, JobApplication, JobFilter } from '../models/job.model';

@Injectable({ providedIn: 'root' })
export class JobsService {
  private jobs: Job[] = [];
  private jobsLoaded = false;

  constructor(private http: HttpClient) {
    this.loadJobs();
  }

  private loadJobs(): void {
    if (!this.jobsLoaded) {
      this.http.get<Job[]>('assets/jobs.json').subscribe(
        data => this.jobs = data,
        error => console.error('Error loading jobs:', error)
      );
      this.jobsLoaded = true;
    }
  }

  getJobs(): Observable<Job[]> {
    return of(this.jobs);
  }

  getJobById(id: string): Observable<Job> {
    const job = this.jobs.find(j => j.id === id);
    return of(job!);
  }

  getFeaturedJobs(count = 3): Observable<Job[]> {
    return of(this.jobs.filter(job => job.featured).slice(0, count));
  }

  async addJob(job: Omit<Job, 'id'>): Promise<void> {
    // Mock implementation
    console.log('Adding job:', job);
  }

  async updateJob(id: string, data: Partial<Job>): Promise<void> {
    // Mock implementation
    console.log('Updating job:', id, data);
  }

  async deleteJob(id: string): Promise<void> {
    // Mock implementation
    console.log('Deleting job:', id);
  }

  async submitApplication(app: JobApplication, cvFile?: File): Promise<void> {
    // Mock implementation
    console.log('Submitting application:', app, cvFile);
  }

  async saveEnquiry(data: Record<string, string>): Promise<void> {
    // Mock implementation
    console.log('Saving enquiry:', data);
  }

  async saveContact(data: Record<string, string>): Promise<void> {
    // Mock implementation
    console.log('Saving contact:', data);
  }
}
