import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PackagesService } from '../../../core/services/packages.service';
import { PackageCardComponent } from '../../../shared/card/package-card.component';
import { Package } from '../../../core/models/package.model';

@Component({
  selector: 'app-umrah-detail',
  standalone: true,
  imports: [RouterLink, PackageCardComponent],
  templateUrl: './umrah-detail.component.html',
})
export class UmrahDetailComponent implements OnInit {
  private route  = inject(ActivatedRoute);
  private pkgSvc = inject(PackagesService);

  pkg      = signal<Package | null>(null);
  related  = signal<Package[]>([]);
  loading  = signal(true);
  activeTab    = signal('overview');
  openAccordion = signal<number | null>(null);

  tabs = [
    { id: 'overview',  label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'includes',  label: 'Includes / Excludes' },
    { id: 'gallery',   label: 'Gallery' },
  ];

  pkgStats() {
    const p = this.pkg();
    if (!p) return [];
    return [
      { key: 'Duration',   value: p.duration.split('/')[0].trim() },
      { key: 'Departure',  value: p.departure },
      { key: 'Seats Left', value: String(p.seats) },
      { key: 'Date',       value: String(p.departureDate) },
    ];
  }

  sidebarInfo() {
    const p = this.pkg();
    if (!p) return [];
    return [
      { key: 'Duration',  value: p.duration.split('/')[0].trim() },
      { key: 'From',      value: p.departure },
      { key: 'Date',      value: String(p.departureDate) },
      { key: 'Seats',     value: String(p.seats) },
      ...(p.tier ? [{ key: 'Tier', value: p.tier }] : []),
    ];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.pkgSvc.getPackageById(id).subscribe(p => {
      this.pkg.set(p);
      this.loading.set(false);
    });
    this.pkgSvc.getPackagesByType('umrah').subscribe(all => {
      this.related.set(all.filter(p => p.id !== id).slice(0, 2));
    });
  }

  toggleAccordion(day: number): void {
    this.openAccordion.set(this.openAccordion() === day ? null : day);
  }

  bookNow(): void {
    alert('Booking modal — integrate Angular CDK Dialog or a custom ModalService here.');
  }

  sendEnquiry(): void {
    alert('Enquiry modal — integrate Angular CDK Dialog or a custom ModalService here.');
  }
}
