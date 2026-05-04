import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import { Package, PackageType } from '../models/package.model';

@Injectable({ providedIn: 'root' })
export class PackagesService {
  private umrahPackages: Package[] = [];
  private hajjPackages: Package[] = [];
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

      this.http.get<Package[]>('assets/hajj.json').subscribe(
        data => this.hajjPackages = data,
        error => console.error('Error loading hajj packages:', error)
      );

      this.packagesLoaded = true;
    }
  }

  private getAllPackages(): Package[] {
    return [...this.umrahPackages, ...this.hajjPackages];
  }

  getPackagesByType(type: PackageType): Observable<Package[]> {
    const packages = type === 'umrah' ? this.umrahPackages : this.hajjPackages;
    return of(packages);
  }

  getPackageById(id: string): Observable<Package> {
    const pkg = this.getAllPackages().find(p => p.id === id);
    return of(pkg!);
  }

  getFeaturedPackages(type: PackageType, count = 3): Observable<Package[]> {
    const packages = type === 'umrah' ? this.umrahPackages : this.hajjPackages;
    return of(packages.filter(pkg => pkg.featured).slice(0, count));
  }

  async addPackage(pkg: Omit<Package, 'id'>): Promise<void> {
    // Mock implementation - in real app would save to backend
    console.log('Adding package:', pkg);
  }

  async updatePackage(id: string, data: Partial<Package>): Promise<void> {
    // Mock implementation
    console.log('Updating package:', id, data);
  }

  async deletePackage(id: string): Promise<void> {
    // Mock implementation
    console.log('Deleting package:', id);
  }

  async toggleFeatured(id: string, featured: boolean): Promise<void> {
    // Mock implementation
    console.log('Toggling featured:', id, featured);
  }
}
