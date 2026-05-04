import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobsService } from '../../../core/services/jobs.service';
import { JobCardComponent } from '../../../shared/card/job-card.component';
import { Job, JobFilter } from '../../../core/models/job.model';

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [FormsModule, JobCardComponent],
  template: `
    <div class="relative bg-gradient-to-br from-neutral-900 to-neutral-700 pt-20 pb-16 px-6 md:px-10 overflow-hidden">
      <div class="absolute inset-0 geo-bg opacity-[0.06]"></div>
      <div class="relative z-10 text-center max-w-2xl mx-auto">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4
                     bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-[2px] uppercase">
          💼 Overseas Careers
        </span>
        <h1 class="font-serif text-4xl md:text-6xl font-bold text-white mb-4">Job Opportunities</h1>
        <p class="text-white/70 text-base">Explore international career opportunities across 20+ countries</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

        <!-- Sidebar Filters -->
        <aside class="lg:sticky lg:top-24 bg-white dark:bg-neutral-800 rounded-2xl border
                      border-neutral-100 dark:border-neutral-700 p-6 h-fit shadow-luxury">
          <h3 class="font-bold text-neutral-900 dark:text-neutral-100 mb-5">Filter Jobs</h3>

          <div class="mb-6">
            <div class="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Country</div>
            @for (country of countries; track country) {
              <label class="flex items-center gap-2 py-1.5 cursor-pointer hover:text-emerald-700 transition-colors text-sm text-neutral-600 dark:text-neutral-300">
                <input type="checkbox" [value]="country"
                       (change)="toggleFilter('countries', country)"
                       class="accent-emerald-700 w-4 h-4">
                {{ country }}
              </label>
            }
          </div>

          <div class="mb-6">
            <div class="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Category</div>
            @for (cat of categories; track cat) {
              <label class="flex items-center gap-2 py-1.5 cursor-pointer hover:text-emerald-700 transition-colors text-sm text-neutral-600 dark:text-neutral-300">
                <input type="checkbox" [value]="cat"
                       (change)="toggleFilter('categories', cat)"
                       class="accent-emerald-700 w-4 h-4">
                {{ cat }}
              </label>
            }
          </div>

          <div class="mb-6">
            <div class="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Experience</div>
            @for (exp of experiences; track exp) {
              <label class="flex items-center gap-2 py-1.5 cursor-pointer hover:text-emerald-700 transition-colors text-sm text-neutral-600 dark:text-neutral-300">
                <input type="checkbox" [value]="exp"
                       (change)="toggleFilter('experience', exp)"
                       class="accent-emerald-700 w-4 h-4">
                {{ exp }}
              </label>
            }
          </div>

          <button (click)="resetFilters()"
                  class="w-full py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm font-medium
                         hover:border-emerald-700 hover:text-emerald-700 transition-colors duration-200">
            Reset All Filters
          </button>
        </aside>

        <!-- Jobs Grid -->
        <div>
          <p class="text-sm text-neutral-400 font-medium mb-6">
            Showing {{ filtered().length }} of {{ all().length }} jobs
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            @for (job of filtered(); track job.id) {
              <app-job-card [job]="job" (applyClick)="onApply($event)" />
            }
            @if (loading()) {
              @for (i of [1,2,3,4]; track i) {
                <div class="skeleton h-52 rounded-2xl"></div>
              }
            }
            @if (!loading() && !filtered().length) {
              <div class="col-span-2 text-center py-20 text-neutral-400">
                <div class="text-5xl mb-4">💼</div>
                <h3 class="text-lg font-semibold mb-2">No jobs found</h3>
                <p class="text-sm">Try adjusting your filters</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class JobsListComponent implements OnInit {
  private jobSvc = inject(JobsService);

  all     = signal<Job[]>([]);
  loading = signal(true);

  activeFilters: JobFilter = { countries: [], categories: [], experience: [] };

  countries   = ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'UK', 'Germany', 'Canada'];
  categories  = ['Construction', 'Healthcare', 'Electrical', 'Finance', 'IT & Technology', 'Hospitality'];
  experiences = ['0–1 years', '2+ years', '3+ years', '4+ years', '5+ years'];

  filtered = computed(() => {
    let jobs = this.all();
    const { countries, categories, experience } = this.activeFilters;
    if (countries.length)  jobs = jobs.filter(j => countries.includes(j.country));
    if (categories.length) jobs = jobs.filter(j => categories.includes(j.category));
    if (experience.length) jobs = jobs.filter(j => experience.includes(j.experience));
    return jobs;
  });

  ngOnInit(): void {
    this.jobSvc.getJobs().subscribe(jobs => { this.all.set(jobs); this.loading.set(false); });
  }

  toggleFilter(field: keyof JobFilter, value: string): void {
    const arr = [...this.activeFilters[field]];
    const idx = arr.indexOf(value);
    if (idx > -1) arr.splice(idx, 1); else arr.push(value);
    this.activeFilters = { ...this.activeFilters, [field]: arr };
  }

  resetFilters(): void {
    this.activeFilters = { countries: [], categories: [], experience: [] };
    // Uncheck all checkboxes
    document.querySelectorAll('input[type=checkbox]').forEach((el: Element) => {
      (el as HTMLInputElement).checked = false;
    });
  }

  onApply(job: Job): void {
    console.log('Apply for:', job.title);
    // Open modal via ModalService
  }
}
