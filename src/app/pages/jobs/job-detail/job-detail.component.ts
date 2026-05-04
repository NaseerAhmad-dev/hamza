import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { JobsService } from '../../../core/services/jobs.service';
import { JobCardComponent } from '../../../shared/card/job-card.component';
import { Job } from '../../../core/models/job.model';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, JobCardComponent],
  template: `
    @if (loading()) {
      <div class="max-w-7xl mx-auto px-6 md:px-10 py-20 flex flex-col gap-4">
        <div class="skeleton h-48 rounded-2xl"></div>
        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-2 skeleton h-80 rounded-2xl"></div>
          <div class="skeleton h-80 rounded-2xl"></div>
        </div>
      </div>
    }

    @if (job()) {
      <!-- Header Banner -->
      <div class="relative bg-gradient-to-br from-neutral-900 to-neutral-700 py-16 px-6 md:px-10 overflow-hidden">
        <div class="absolute inset-0 geo-bg opacity-[0.06]"></div>
        <div class="relative z-10 max-w-7xl mx-auto flex flex-wrap items-center gap-6">
          <div class="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur overflow-hidden">
            <img [src]="job()!.logo" [alt]="job()!.company + ' logo'"
                 class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 text-white/60 text-sm mb-2">
              <a routerLink="/" class="hover:text-white transition-colors">Home</a>
              <span>/</span>
              <a routerLink="/jobs" class="hover:text-white transition-colors">Jobs</a>
              <span>/</span>
              <span class="text-white/80 truncate">{{ job()!.title }}</span>
            </div>
            <h1 class="font-serif text-3xl md:text-5xl font-bold text-white mb-2">{{ job()!.title }}</h1>
            <div class="flex flex-wrap gap-4 text-white/70 text-sm">
              <span>🏢 {{ job()!.company }}</span>
              <span>🌍 {{ job()!.country }}</span>
              <span>📂 {{ job()!.category }}</span>
              @if (job()!.featured) {
                <span class="px-2.5 py-0.5 rounded-full bg-yellow-400 text-neutral-900 text-xs font-bold">⭐ Featured</span>
              }
            </div>
          </div>
          <div class="flex gap-3 flex-wrap">
            <button (click)="showApply.set(true)"
                    class="px-8 py-4 rounded-full bg-yellow-400 text-neutral-900 font-bold text-sm
                           hover:bg-yellow-300 transition-colors duration-200">
              Apply Now
            </button>
            <button class="px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-sm
                           hover:bg-white/10 transition-colors duration-200">
              Save Job
            </button>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
        <div>
          <!-- Stats row -->
          <div class="flex flex-wrap gap-4 mb-8">
            @for (stat of jobStats(); track stat.key) {
              <div class="bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700
                          rounded-xl p-4 text-center min-w-[120px] flex-1">
                <div class="font-bold text-base" [class.text-emerald-700]="stat.key !== 'Deadline'"
                     [class.text-yellow-700]="stat.key === 'Deadline'">{{ stat.value }}</div>
                <div class="text-xs text-neutral-400 mt-0.5 uppercase tracking-wide">{{ stat.key }}</div>
              </div>
            }
          </div>

          <!-- Description -->
          <h2 class="font-serif text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Job Description</h2>
          <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8 text-base">{{ job()!.description }}</p>

          <!-- Requirements -->
          <h2 class="font-serif text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Requirements</h2>
          <ul class="flex flex-col gap-3 mb-10">
            @for (req of job()!.requirements; track req) {
              <li class="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
                <span class="text-emerald-600 font-bold mt-0.5">✓</span>
                <span class="text-sm leading-relaxed">{{ req }}</span>
              </li>
            }
          </ul>

          <!-- Application Form (inline) -->
          @if (showApply()) {
            <div class="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700
                        p-8 mb-10 shadow-luxury">
              <h2 class="font-serif text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                📋 Apply for this Position
              </h2>
              <form [formGroup]="applyForm" (ngSubmit)="submitApplication()" class="flex flex-col gap-5">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div class="flex flex-col gap-2">
                    <label class="text-xs font-bold uppercase tracking-wide text-neutral-400">Full Name *</label>
                    <input formControlName="name" placeholder="Your full name"
                           class="form-input" [class.border-red-400]="applyForm.get('name')?.invalid && submitted()">
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-xs font-bold uppercase tracking-wide text-neutral-400">Phone *</label>
                    <input formControlName="phone" placeholder="+44 7700 000000"
                           class="form-input">
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-bold uppercase tracking-wide text-neutral-400">Email *</label>
                  <input formControlName="email" type="email" placeholder="your@email.com"
                         class="form-input" [class.border-red-400]="applyForm.get('email')?.invalid && submitted()">
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-bold uppercase tracking-wide text-neutral-400">Years of Experience</label>
                  <input formControlName="experience" type="number" min="0" placeholder="e.g. 3"
                         class="form-input">
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-bold uppercase tracking-wide text-neutral-400">Upload CV (PDF / DOCX)</label>
                  <input type="file" accept=".pdf,.doc,.docx" (change)="onFileSelect($event)"
                         class="form-input file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0
                                file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700
                                hover:file:bg-emerald-100">
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-bold uppercase tracking-wide text-neutral-400">Cover Letter</label>
                  <textarea formControlName="coverLetter" rows="4" placeholder="Why are you a great fit?"
                            class="form-input resize-none"></textarea>
                </div>
                <div class="flex gap-3">
                  <button type="submit"
                          class="flex-1 py-4 rounded-xl bg-emerald-800 text-white font-bold text-sm
                                 hover:bg-emerald-700 transition-colors duration-200">
                    Submit Application
                  </button>
                  <button type="button" (click)="showApply.set(false)"
                          class="px-6 py-4 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm
                                 font-medium hover:border-neutral-400 transition-colors duration-200">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          }

          <!-- Similar Jobs -->
          <h2 class="font-serif text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Similar Jobs</h2>
          <div class="flex flex-col gap-4">
            @for (sim of similar(); track sim.id) {
              <app-job-card [job]="sim" (applyClick)="showApply.set(true)" />
            }
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:sticky lg:top-24">
          <div class="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700
                      p-7 shadow-luxury">
            <h3 class="font-bold text-neutral-900 dark:text-neutral-100 mb-5">Job Details</h3>
            <div class="flex flex-col border border-neutral-100 dark:border-neutral-700 rounded-xl overflow-hidden mb-6">
              @for (row of sideInfo(); track row.key) {
                <div class="flex justify-between px-4 py-3 border-b border-neutral-100 dark:border-neutral-700 last:border-0">
                  <span class="text-xs text-neutral-400">{{ row.key }}</span>
                  <span class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{{ row.value }}</span>
                </div>
              }
            </div>
            <button (click)="showApply.set(true)"
                    class="w-full py-4 rounded-xl bg-emerald-800 text-white font-bold text-sm mb-3
                           hover:bg-emerald-700 transition-colors duration-200">
              📋 Apply Now
            </button>
            <a routerLink="/contact"
               class="block w-full py-3.5 rounded-xl border-2 border-emerald-700 text-emerald-700 text-center
                      font-semibold text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors duration-200">
              ✉ Enquire
            </a>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .form-input {
      padding: 11px 14px; border-radius: 10px;
      border: 2px solid #e5e7eb; background: #f9fafb;
      font-family: 'DM Sans', sans-serif; font-size: 14px; color: inherit;
      width: 100%; transition: border-color 0.2s;
    }
    :host-context(.dark) .form-input { background: #374151; border-color: #4b5563; }
    .form-input:focus { outline: none; border-color: #065F46; }
  `],
})
export class JobDetailComponent implements OnInit {
  private route  = inject(ActivatedRoute);
  private jobSvc = inject(JobsService);
  private fb     = inject(FormBuilder);

  job     = signal<Job | null>(null);
  similar = signal<Job[]>([]);
  loading = signal(true);
  showApply = signal(false);
  submitted = signal(false);
  selectedFile: File | null = null;

  applyForm = this.fb.group({
    name:        ['', Validators.required],
    phone:       ['', Validators.required],
    email:       ['', [Validators.required, Validators.email]],
    experience:  [0],
    coverLetter: [''],
  });

  jobStats() {
    const j = this.job(); if (!j) return [];
    return [
      { key: 'Salary',     value: j.salary },
      { key: 'Experience', value: j.experience },
      { key: 'Country',    value: j.country },
      { key: 'Deadline',   value: String(j.deadline) },
    ];
  }

  sideInfo() {
    const j = this.job(); if (!j) return [];
    return [
      { key: 'Company',    value: j.company },
      { key: 'Country',    value: j.country },
      { key: 'Category',   value: j.category },
      { key: 'Salary',     value: j.salary },
      { key: 'Experience', value: j.experience },
      { key: 'Deadline',   value: String(j.deadline) },
    ];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.jobSvc.getJobById(id).subscribe(j => { this.job.set(j); this.loading.set(false); });
    this.jobSvc.getJobs().subscribe(all => {
      const j = this.job();
      this.similar.set(all.filter(x => x.id !== id && x.category === j?.category).slice(0, 2));
    });
  }

  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.selectedFile = file;
  }

  async submitApplication(): Promise<void> {
    this.submitted.set(true);
    if (this.applyForm.invalid) return;
    const j = this.job()!;
    await this.jobSvc.submitApplication(
      {
        jobId:   j.id!,
        jobTitle: j.title,
        name:    this.applyForm.value.name!,
        phone:   this.applyForm.value.phone!,
        email:   this.applyForm.value.email!,
        experience: this.applyForm.value.experience ?? 0,
        coverLetter: this.applyForm.value.coverLetter ?? '',
      },
      this.selectedFile ?? undefined
    );
    this.showApply.set(false);
    this.applyForm.reset();
    this.submitted.set(false);
    alert('Application submitted successfully!');
  }
}
