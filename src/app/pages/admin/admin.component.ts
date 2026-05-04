import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PackagesService } from '../../core/services/packages.service';
import { JobsService } from '../../core/services/jobs.service';
import { AuthService } from '../../core/services/auth.service';
import { Package } from '../../core/models/package.model';
import { Job } from '../../core/models/job.model';

type AdminTab = 'umrah' | 'hajj' | 'jobs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styles: [`
    .th { padding: 12px 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: #6b7280; }
    .td { padding: 14px 20px; font-size: 13px; color: #4b5563; }
    :host-context(.dark) .td { color: #d1d5db; }
    .icon-btn { width: 30px; height: 30px; border-radius: 7px; border: 1px solid #e5e7eb; background: transparent;
      font-size: 13px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
    .icon-btn:hover { border-color: #065F46; }
    .label-sm { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #9ca3af; }
    .input-sm { padding: 10px 12px; border-radius: 8px; border: 1.5px solid #e5e7eb; background: #f9fafb;
      font-size: 14px; color: inherit; width: 100%; }
    .input-sm:focus { outline: none; border-color: #065F46; }
    :host-context(.dark) .input-sm { background: #374151; border-color: #4b5563; }
  `],
})
export class AdminComponent implements OnInit {
  private pkgSvc = inject(PackagesService);
  private jobSvc = inject(JobsService);
  auth = inject(AuthService);
  private fb = inject(FormBuilder);

  umrahPkgs = signal<Package[]>([]);
  hajjPkgs  = signal<Package[]>([]);
  jobs      = signal<Job[]>([]);
  activeTab = signal<AdminTab>('umrah');
  showAddPkg = signal<'umrah' | 'hajj' | null>(null);

  tabs: { id: AdminTab; label: string }[] = [
    { id: 'umrah', label: 'Umrah Packages' },
    { id: 'hajj',  label: 'Hajj Packages'  },
    { id: 'jobs',  label: 'Jobs'           },
  ];

  pkgForm = this.fb.group({
    title:     ['', Validators.required],
    price:     [0, Validators.required],
    duration:  ['', Validators.required],
    departure: [''],
    seats:     [30],
    includes:  [''],
    featured:  [false],
  });

  dashStats() {
    return [
      { label: 'Umrah Packages', value: this.umrahPkgs().length },
      { label: 'Hajj Packages',  value: this.hajjPkgs().length },
      { label: 'Active Jobs',    value: this.jobs().length },
      { label: 'Total Packages', value: this.umrahPkgs().length + this.hajjPkgs().length },
    ];
  }

  ngOnInit(): void {
    this.pkgSvc.getPackagesByType('umrah').subscribe(p => this.umrahPkgs.set(p));
    this.pkgSvc.getPackagesByType('hajj').subscribe(p => this.hajjPkgs.set(p));
    this.jobSvc.getJobs().subscribe(j => this.jobs.set(j));
  }

  async toggleFeatured(pkg: Package): Promise<void> {
    await this.pkgSvc.toggleFeatured(pkg.id!, !pkg.featured);
  }

  async toggleJobFeatured(job: Job): Promise<void> {
    await this.jobSvc.updateJob(job.id!, { featured: !job.featured });
  }

  async deletePkg(pkg: Package): Promise<void> {
    if (confirm(`Delete "${pkg.title}"?`)) await this.pkgSvc.deletePackage(pkg.id!);
  }

  async deleteJob(job: Job): Promise<void> {
    if (confirm(`Delete "${job.title}"?`)) await this.jobSvc.deleteJob(job.id!);
  }

  async addPackage(): Promise<void> {
    if (this.pkgForm.invalid) return;
    const type = this.showAddPkg()!;
    const v = this.pkgForm.value;
    await this.pkgSvc.addPackage({
      type,
      title:       v.title!,
      price:       v.price!,
      duration:    v.duration!,
      departure:   v.departure || '',
      departureDate: 'TBD',
      seats:       v.seats!,
      includes:    v.includes ? v.includes.split(',').map((s: string) => s.trim()) : [],
      excludes:    ['Personal Expenses'],
      itinerary:   [],
      images:      [],
      featured:    v.featured!,
    });
    this.pkgForm.reset({ seats: 30, featured: false });
    this.showAddPkg.set(null);
  }
}
