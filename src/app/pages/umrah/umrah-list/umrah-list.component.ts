import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PackagesService } from '../../../core/services/packages.service';
import { PackageCardComponent } from '../../../shared/card/package-card.component';
import { Package, PackageFilter } from '../../../core/models/package.model';

@Component({
  selector: 'app-umrah-list',
  standalone: true,
  imports: [FormsModule, PackageCardComponent],
  templateUrl: './umrah-list.component.html',
  styles: [`
    .input-field {
      padding: 9px 14px; border-radius: 8px;
      border: 1.5px solid #e5e7eb; background: #f9fafb;
      font-size: 14px; color: inherit; transition: border-color 0.2s;
      -webkit-appearance: none;
    }
    :host-context(.dark) .input-field { background: #374151; border-color: #4b5563; }
    .input-field:focus { outline: none; border-color: #065F46; }
  `],
})
export class UmrahListComponent implements OnInit {
  private pkgSvc = inject(PackagesService);

  all     = signal<Package[]>([]);
  loading = signal(true);

  filter: PackageFilter = { priceRange: '', duration: '', departure: '' };

  filtered = computed(() => {
    let pkgs = this.all();
    const { priceRange, duration, departure } = this.filter;
    if (priceRange === 'under2000')  pkgs = pkgs.filter(p => p.price < 2000);
    if (priceRange === '2000-4000')  pkgs = pkgs.filter(p => p.price >= 2000 && p.price <= 4000);
    if (priceRange === 'over4000')   pkgs = pkgs.filter(p => p.price > 4000);
    if (duration)    pkgs = pkgs.filter(p => p.duration.includes(duration));
    if (departure)   pkgs = pkgs.filter(p => p.departure === departure);
    return pkgs;
  });

  ngOnInit(): void {
    this.pkgSvc.getPackagesByType('umrah').subscribe(pkgs => {
      this.all.set(pkgs);
      this.loading.set(false);
    });
  }

  applyFilter(): void { /* computed auto-updates */ }

  resetFilter(): void {
    this.filter = { priceRange: '', duration: '', departure: '' };
  }
}
