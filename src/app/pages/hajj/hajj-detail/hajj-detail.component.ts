import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PackagesService } from '../../../core/services/packages.service';
import { PackageCardComponent } from '../../../shared/card/package-card.component';
import { Package } from '../../../core/models/package.model';

@Component({
  selector: 'app-hajj-detail',
  standalone: true,
  imports: [RouterLink, PackageCardComponent],
  templateUrl: './hajj-detail.component.html',
})
export class HajjDetailComponent implements OnInit {
  private route  = inject(ActivatedRoute);
  private pkgSvc = inject(PackagesService);

  pkg      = signal<Package | null>(null);
  related  = signal<Package[]>([]);
  loading  = signal(true);
  activeTab = signal('overview');
  openAcc   = signal<number | null>(null);

  tabs = [
    { id: 'overview',  label: 'Overview'          },
    { id: 'itinerary', label: 'Itinerary'         },
    { id: 'includes',  label: 'Includes/Excludes' },
    { id: 'gallery',   label: 'Gallery'           },
  ];

  stats() {
    const p = this.pkg(); if (!p) return [];
    return [
      { key: 'Duration',   value: p.duration.split('/')[0].trim() },
      { key: 'From',       value: p.departure },
      { key: 'Seats',      value: String(p.seats) },
      { key: 'Tier',       value: p.tier || 'Standard' },
    ];
  }

  sideInfo() {
    const p = this.pkg(); if (!p) return [];
    return [
      { key: 'Duration',  value: p.duration.split('/')[0].trim() },
      { key: 'From',      value: p.departure },
      { key: 'Date',      value: String(p.departureDate) },
      { key: 'Seats',     value: String(p.seats) },
      { key: 'Tier',      value: p.tier || 'Standard' },
    ];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.pkgSvc.getPackageById(id).subscribe(p => { this.pkg.set(p); this.loading.set(false); });
    this.pkgSvc.getPackagesByType('hajj').subscribe(all => {
      this.related.set(all.filter(p => p.id !== id).slice(0, 2));
    });
  }

  toggleAcc(day: number): void {
    this.openAcc.set(this.openAcc() === day ? null : day);
  }
}
