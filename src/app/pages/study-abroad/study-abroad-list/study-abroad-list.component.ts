import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { STUDY_PROGRAMS, StudyProgram } from '../../../core/data/study-programs.data';

@Component({
  selector: 'app-study-abroad-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Hero -->
    <section class="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white overflow-hidden pt-[72px]">
      <div class="absolute inset-0 pointer-events-none"
           style="background-image: radial-gradient(circle at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.15) 0%, transparent 50%)"></div>
      <div class="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
        <span class="inline-block px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-sm font-medium text-blue-200 mb-6 border border-white/10">
          🎓 International Education Consultancy
        </span>
        <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Study Abroad Programs
        </h1>
        <p class="text-blue-200 text-lg max-w-2xl mx-auto mb-10">
          From MBBS to MBA — we guide Pakistani students to world-class universities across the globe with end-to-end support.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          @for (stat of stats; track stat.label) {
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div class="text-2xl md:text-3xl font-bold text-yellow-400">{{ stat.value }}</div>
              <div class="text-sm text-blue-200 mt-1">{{ stat.label }}</div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="sticky top-[72px] z-30 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 shadow-sm">
      <div class="max-w-6xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 flex-1">
          @for (cat of categories; track cat) {
            <button (click)="activeCategory.set(cat)"
                    [class]="activeCategory() === cat
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700'"
                    class="shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap">
              {{ cat }}
            </button>
          }
        </div>
        <select (change)="activeCountry.set($any($event.target).value)"
                [value]="activeCountry()"
                class="input-field w-full sm:w-44 text-sm shrink-0">
          <option value="">All Countries</option>
          @for (c of countries; track c) {
            <option [value]="c">{{ c }}</option>
          }
        </select>
      </div>
    </section>

    <!-- Programs Grid -->
    <main class="max-w-6xl mx-auto px-6 py-10">
      <div class="flex items-center justify-between mb-6">
        <p class="text-sm text-neutral-500 dark:text-neutral-400">
          {{ filtered().length }} program{{ filtered().length !== 1 ? 's' : '' }} found
        </p>
        @if (activeCategory() !== 'All' || activeCountry()) {
          <button (click)="resetFilters()"
                  class="text-sm text-blue-700 dark:text-blue-400 hover:underline">
            Clear filters
          </button>
        }
      </div>

      @if (filtered().length === 0) {
        <div class="text-center py-24 text-neutral-400">
          <div class="text-5xl mb-4">🔍</div>
          <p class="text-lg font-medium text-neutral-600 dark:text-neutral-300">No programs match your filters</p>
          <button (click)="resetFilters()"
                  class="mt-4 text-blue-700 dark:text-blue-400 hover:underline text-sm font-medium">
            Show all programs
          </button>
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (prog of filtered(); track prog.id) {
            <article class="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700
                           hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">
              <!-- Card top -->
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 flex items-start justify-between">
                <div>
                  <span class="text-4xl mb-3 block">{{ prog.icon }}</span>
                  <h2 class="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                    {{ prog.title }}
                  </h2>
                  <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{{ prog.fullName }}</p>
                </div>
                @if (prog.featured) {
                  <span class="shrink-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full">
                    Popular
                  </span>
                }
              </div>

              <!-- Card body -->
              <div class="p-6 flex-1 flex flex-col gap-4">
                <!-- Badges -->
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {{ prog.category }}
                  </span>
                  <span class="text-neutral-400 dark:text-neutral-500 text-xs flex items-center gap-1">
                    ⏱ {{ prog.duration }}
                  </span>
                </div>

                <!-- Description -->
                <p class="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-2">
                  {{ prog.description }}
                </p>

                <!-- Countries -->
                <div class="flex flex-wrap gap-1.5">
                  @for (country of prog.countries.slice(0, 4); track country) {
                    <span class="bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs px-2.5 py-1 rounded-full">
                      {{ country }}
                    </span>
                  }
                  @if (prog.countries.length > 4) {
                    <span class="bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 text-xs px-2.5 py-1 rounded-full">
                      +{{ prog.countries.length - 4 }} more
                    </span>
                  }
                </div>

                <!-- Highlights -->
                <div class="flex flex-col gap-1.5 flex-1">
                  @for (h of prog.highlights.slice(0, 3); track h) {
                    <div class="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                      <span class="w-4 h-4 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px]">✓</span>
                      {{ h }}
                    </div>
                  }
                </div>

                <!-- Fee + CTA -->
                <div class="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-700 pt-4 mt-2">
                  <div>
                    <div class="text-xs text-neutral-400 mb-0.5">Annual Fee</div>
                    <div class="font-bold text-blue-700 dark:text-blue-400 text-sm">{{ prog.annualFee }}</div>
                  </div>
                  <a [routerLink]="['/study-abroad', prog.id]"
                     class="bg-blue-700 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200">
                    View Details
                  </a>
                </div>
              </div>
            </article>
          }
        </div>
      }
    </main>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-16 px-6 mt-6">
      <div class="max-w-3xl mx-auto text-center">
        <span class="text-4xl block mb-4">🎓</span>
        <h2 class="text-3xl font-bold mb-4">Not sure which program is right for you?</h2>
        <p class="text-blue-200 mb-8 text-lg">
          Our education counsellors are here to help you choose the right program based on your academic background, career goals, and budget.
        </p>
        <a routerLink="/contact"
           class="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold px-8 py-4 rounded-xl transition-colors duration-200 text-base">
          Get Free Counselling Today
        </a>
      </div>
    </section>
  `,
  styles: [`
    .input-field {
      padding: 9px 14px;
      border-radius: 8px;
      border: 1.5px solid #e5e7eb;
      background: #f9fafb;
      font-size: 14px;
      color: inherit;
      transition: border-color 0.2s;
      -webkit-appearance: none;
    }
    :host-context(.dark) .input-field {
      background: #374151;
      border-color: #4b5563;
      color: #f3f4f6;
    }
    .input-field:focus { outline: none; border-color: #1d4ed8; }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `],
})
export class StudyAbroadListComponent {
  activeCategory = signal('All');
  activeCountry = signal('');

  categories = ['All', 'Medical', 'Engineering & IT', 'Business', 'Law'];
  countries = ['Russia', 'China', 'UK', 'Germany', 'Georgia', 'Malaysia', 'Kazakhstan', 'Australia', 'Bangladesh'];

  stats = [
    { value: '50+', label: 'Partner Universities' },
    { value: '15+', label: 'Countries' },
    { value: '8+', label: 'Programs' },
    { value: '500+', label: 'Students Placed' },
  ];

  filtered = computed(() => {
    let progs: StudyProgram[] = STUDY_PROGRAMS;
    const cat = this.activeCategory();
    const country = this.activeCountry();
    if (cat !== 'All') progs = progs.filter(p => p.category === cat);
    if (country) progs = progs.filter(p => p.countries.includes(country));
    return progs;
  });

  resetFilters(): void {
    this.activeCategory.set('All');
    this.activeCountry.set('');
  }
}
