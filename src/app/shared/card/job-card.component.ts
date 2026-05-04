import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Job } from '../../core/models/job.model';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700
                p-6 flex flex-col gap-4 shadow-luxury hover:-translate-y-1 hover:shadow-luxury-lg
                hover:border-emerald-200 transition-all duration-300 cursor-pointer"
         [routerLink]="'/jobs/' + job.id">

      <!-- Header -->
      <div class="flex gap-4 items-start">
        <div class="w-13 h-13 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-500
                    flex items-center justify-center text-white font-bold flex-shrink-0 w-12 h-12 overflow-hidden">
          <img [src]="job.logo" [alt]="job.company + ' logo'"
               class="w-full h-full object-cover" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <h3 class="font-bold text-neutral-900 dark:text-neutral-100 leading-snug">{{ job.title }}</h3>
            @if (job.featured) {
              <span class="flex-shrink-0 px-2 py-0.5 text-[10px] font-bold rounded-full
                           bg-yellow-400 text-neutral-900 uppercase tracking-wider">⭐</span>
            }
          </div>
          <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">{{ job.company }}</p>
        </div>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        <span class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-700
                     text-xs text-neutral-600 dark:text-neutral-300 font-medium">
          🌍 {{ job.country }}
        </span>
        <span class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-700
                     text-xs text-neutral-600 dark:text-neutral-300 font-medium">
          📂 {{ job.category }}
        </span>
        <span class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-700
                     text-xs text-neutral-600 dark:text-neutral-300 font-medium">
          🎓 {{ job.experience }}
        </span>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-700">
        <span class="font-bold text-emerald-700 dark:text-emerald-400">{{ job.salary }}</span>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 text-[11px] font-bold rounded-lg
                       bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400
                       border border-yellow-200 dark:border-yellow-700">
            ⏰ {{ job.deadline }}
          </span>
          <button (click)="$event.stopPropagation(); applyClick.emit(job)"
                  class="px-4 py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-semibold
                         hover:bg-emerald-700 transition-colors duration-200">
            Apply
          </button>
        </div>
      </div>
    </div>
  `,
})
export class JobCardComponent {
  @Input({ required: true }) job!: Job;
  @Output() applyClick = new EventEmitter<Job>();
}
