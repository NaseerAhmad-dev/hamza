import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Package } from '../models/package.model';

@Injectable({ providedIn: 'root' })
export class PackagesService {
  private umrahPackages: Package[] = [];
  private packagesLoaded = false;

  constructor(private http: HttpClient) {
    this.loadPackages();
  }

  private loadPackages(): void {
    if (!this.packagesLoaded) {
      this.http.get<Package[]>('assets/umrah.json').subscribe(
        data => this.umrahPackages = data,
        error => console.error('Error loading umrah packages:', error)
      );
      this.packagesLoaded = true;
    }
  }

  getPackagesByType(_type?: string): Observable<Package[]> {
    return of(this.umrahPackages);
  }

  getPackageById(id: string): Observable<Package> {
    return of(this.umrahPackages.find(p => p.id === id)!);
  }

  getFeaturedPackages(_type?: string, count = 3): Observable<Package[]> {
    return of(this.umrahPackages.filter(pkg => pkg.featured).slice(0, count));
  }

  async addPackage(pkg: Omit<Package, 'id'>): Promise<void> {
    console.log('Adding package:', pkg);
  }

  async updatePackage(id: string, data: Partial<Package>): Promise<void> {
    console.log('Updating package:', id, data);
  }

  async deletePackage(id: string): Promise<void> {
    console.log('Deleting package:', id);
  }

  async toggleFeatured(id: string, featured: boolean): Promise<void> {
    console.log('Toggling featured:', id, featured);
  }
}
