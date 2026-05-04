import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PackagesService } from '../../../core/services/packages.service';
import { PackageCardComponent } from '../../../shared/card/package-card.component';
import { Package, PackageFilter, PackageTier } from '../../../core/models/package.model';

@Component({
  selector: 'app-hajj-list',
  standalone: true,
  imports: [FormsModule, PackageCardComponent],
  templateUrl: './hajj-list.component.html',
  styles: [`.input-field { padding: 9px 14px; border-radius: 8px; border: 1.5px solid #e5e7eb;
    background: #f9fafb; font-size: 14px; color: inherit; -webkit-appearance: none; }
    .input-field:focus { outline: none; border-color: #065F46; }`],
})
export class HajjListComponent implements OnInit {
  private pkgSvc = inject(PackagesService);
  all     = signal<Package[]>([]);
  loading = signal(true);
  filter: PackageFilter = { priceRange: '', departure: '', tier: '' };

  filtered = computed(() => {
    let pkgs = this.all();
    const { priceRange, departure, tier } = this.filter;
    if (priceRange === 'under5000')  pkgs = pkgs.filter(p => p.price < 5000);
    if (priceRange === '5000-8000')  pkgs = pkgs.filter(p => p.price >= 5000 && p.price <= 8000);
    if (priceRange === 'over8000')   pkgs = pkgs.filter(p => p.price > 8000);
    if (departure)  pkgs = pkgs.filter(p => p.departure === departure);
    if (tier)       pkgs = pkgs.filter(p => p.tier === (tier as PackageTier));
    return pkgs;
  });

  ngOnInit(): void {
    this.pkgSvc.getPackagesByType('hajj').subscribe(p => { this.all.set(p); this.loading.set(false); });
  }
  applyFilter(): void { /* signals auto-update */ }
  resetFilter(): void { this.filter = { priceRange: '', departure: '', tier: '' }; }
}
