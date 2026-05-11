import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { STUDY_PROGRAMS, StudyProgram } from '../../../core/data/study-programs.data';

@Component({
  selector: 'app-study-abroad-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (!program()) {
      <div class="pt-[72px] min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <div class="text-6xl mb-4">😕</div>
          <h1 class="text-2xl font-bold text-neutral-700 dark:text-neutral-200 mb-2">Program Not Found</h1>
          <p class="text-neutral-500 dark:text-neutral-400 mb-6">We couldn't find the program you're looking for.</p>
          <a routerLink="/study-abroad"
             class="text-blue-700 dark:text-blue-400 hover:underline font-medium">← Back to all programs</a>
        </div>
      </div>
    } @else {

      <!-- Hero -->
      <section class="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white pt-[72px] overflow-hidden">
        <div class="absolute inset-0 pointer-events-none"
             style="background-image: radial-gradient(circle at 70% 30%, rgba(99,102,241,0.2) 0%, transparent 50%)"></div>
        <div class="max-w-6xl mx-auto px-6 py-10 md:py-14 relative z-10">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm text-blue-300 mb-8">
            <a routerLink="/" class="hover:text-white transition-colors">Home</a>
            <span class="text-blue-500">/</span>
            <a routerLink="/study-abroad" class="hover:text-white transition-colors">Study Abroad</a>
            <span class="text-blue-500">/</span>
            <span class="text-white font-medium">{{ program()!.title }}</span>
          </nav>

          <div class="flex items-start gap-5 md:gap-8">
            <div class="text-5xl md:text-7xl shrink-0">{{ program()!.icon }}</div>
            <div>
              <div class="flex items-center gap-3 flex-wrap mb-3">
                <span class="bg-blue-500/30 border border-blue-400/30 text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
                  {{ program()!.category }}
                </span>
                @if (program()!.featured) {
                  <span class="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                    Popular Choice
                  </span>
                }
              </div>
              <h1 class="text-3xl md:text-4xl font-bold mb-1">{{ program()!.title }}</h1>
              <p class="text-blue-200 text-base md:text-lg">{{ program()!.fullName }}</p>
              <div class="flex flex-wrap items-center gap-4 md:gap-6 mt-4 text-sm text-blue-200">
                <span>⏱ {{ program()!.duration }}</span>
                <span>🌍 {{ program()!.countries.length }} Countries</span>
                <span>🏛 {{ program()!.universities.length }} Partner Universities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <main class="max-w-6xl mx-auto px-6 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <!-- Left: Tabs -->
          <div class="lg:col-span-2 min-w-0">
            <!-- Tab Bar -->
            <div class="flex gap-0.5 border-b border-neutral-200 dark:border-neutral-700 mb-8 overflow-x-auto">
              @for (tab of tabs; track tab.key) {
                <button (click)="activeTab.set(tab.key)"
                        [class]="activeTab() === tab.key
                          ? 'border-b-2 border-blue-700 text-blue-700 dark:text-blue-400 font-semibold bg-blue-50/50 dark:bg-blue-900/10'
                          : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'"
                        class="px-4 py-3 text-sm whitespace-nowrap transition-all duration-200 rounded-t-lg">
                  {{ tab.label }}
                </button>
              }
            </div>

            <!-- Overview Tab -->
            @if (activeTab() === 'overview') {
              <div class="space-y-6">
                <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">
                  {{ program()!.overview }}
                </p>
                <div>
                  <h3 class="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-4">Key Highlights</h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    @for (h of program()!.highlights; track h) {
                      <div class="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/40">
                        <span class="w-7 h-7 bg-blue-700 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                        <span class="text-sm font-medium text-neutral-700 dark:text-neutral-200">{{ h }}</span>
                      </div>
                    }
                  </div>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-4">Available Countries</h3>
                  <div class="flex flex-wrap gap-3">
                    @for (c of program()!.countries; track c) {
                      <div class="flex items-center gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2">
                        <span class="text-base">🌍</span>
                        <span class="text-sm font-medium text-neutral-700 dark:text-neutral-200">{{ c }}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }

            <!-- Eligibility Tab -->
            @if (activeTab() === 'eligibility') {
              <div>
                <h3 class="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-5">Eligibility Requirements</h3>
                <ul class="space-y-3">
                  @for (req of program()!.eligibility; track req) {
                    <li class="flex items-start gap-3 bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-100 dark:border-neutral-700">
                      <span class="w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full flex items-center justify-center text-sm shrink-0 mt-0.5 font-bold">✓</span>
                      <span class="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{{ req }}</span>
                    </li>
                  }
                </ul>
                <div class="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-xl p-4">
                  <p class="text-sm text-amber-800 dark:text-amber-300">
                    <strong>Note:</strong> Requirements may vary by university and country. Contact our counsellors for the most up-to-date information specific to your target institution.
                  </p>
                </div>
              </div>
            }

            <!-- Universities Tab -->
            @if (activeTab() === 'universities') {
              <div>
                <h3 class="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-5">Partner Universities</h3>
                <div class="space-y-3">
                  @for (uni of program()!.universities; track uni.name) {
                    <div class="bg-white dark:bg-neutral-800 rounded-xl p-5 border border-neutral-100 dark:border-neutral-700
                                hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200">
                      <div class="flex items-start justify-between gap-4">
                        <div>
                          <h4 class="font-semibold text-neutral-800 dark:text-neutral-100">{{ uni.name }}</h4>
                          <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1 flex items-center gap-1">
                            🌍 {{ uni.country }}
                          </p>
                        </div>
                        <div class="text-right shrink-0">
                          <div class="text-xs text-neutral-400 mb-0.5">Annual Fee</div>
                          <div class="text-sm font-bold text-blue-700 dark:text-blue-400">{{ uni.fee }}</div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- Fees Tab -->
            @if (activeTab() === 'fees') {
              <div class="space-y-6">
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/40">
                  <div class="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Estimated Annual Fee Range</div>
                  <div class="text-3xl font-bold text-blue-800 dark:text-blue-300">{{ program()!.annualFee }}</div>
                  <p class="text-sm text-blue-600/70 dark:text-blue-400/60 mt-2">
                    * Fees vary by university and country. Contact us for exact fee structures and available scholarships.
                  </p>
                </div>
                <div>
                  <h4 class="font-semibold text-neutral-700 dark:text-neutral-200 mb-4">Fee Breakdown by University</h4>
                  <div class="space-y-3">
                    @for (uni of program()!.universities; track uni.name) {
                      <div class="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-100 dark:border-neutral-700">
                        <div>
                          <div class="font-medium text-sm text-neutral-800 dark:text-neutral-100">{{ uni.name }}</div>
                          <div class="text-xs text-neutral-400 mt-0.5">{{ uni.country }}</div>
                        </div>
                        <div class="text-sm font-bold text-blue-700 dark:text-blue-400 shrink-0">{{ uni.fee }}</div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }

            <!-- How to Apply Tab -->
            @if (activeTab() === 'process') {
              <div class="space-y-4">
                <h3 class="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-5">How to Apply</h3>
                @for (step of program()!.process; track step; let i = $index) {
                  <div class="flex items-start gap-4">
                    <div class="w-9 h-9 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                      {{ i + 1 }}
                    </div>
                    <div class="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-100 dark:border-neutral-700 flex-1">
                      <p class="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{{ step }}</p>
                    </div>
                  </div>
                }
                <div class="mt-8 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white text-center">
                  <p class="text-blue-200 mb-4 text-sm">
                    Ready to begin? Our counsellors will guide you through every step of the application process — from document prep to visa.
                  </p>
                  <a routerLink="/contact"
                     class="inline-block bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold px-6 py-3 rounded-xl transition-colors duration-200">
                    Start Your Application
                  </a>
                </div>
              </div>
            }
          </div>

          <!-- Right: Sidebar -->
          <div>
            <div class="sticky top-[88px] space-y-4">
              <!-- Quick Info Card -->
              <div class="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden">
                <div class="bg-gradient-to-br from-blue-700 to-indigo-700 text-white p-5">
                  <div class="text-sm text-blue-200 mb-1">Annual Fee Range</div>
                  <div class="text-2xl font-bold">{{ program()!.annualFee }}</div>
                </div>
                <div class="p-5 space-y-4">
                  <div class="flex items-center justify-between text-sm border-b border-neutral-100 dark:border-neutral-700 pb-3">
                    <span class="text-neutral-500 dark:text-neutral-400">Duration</span>
                    <span class="font-semibold text-neutral-800 dark:text-neutral-100">{{ program()!.duration }}</span>
                  </div>
                  <div class="flex items-center justify-between text-sm border-b border-neutral-100 dark:border-neutral-700 pb-3">
                    <span class="text-neutral-500 dark:text-neutral-400">Category</span>
                    <span class="font-semibold text-neutral-800 dark:text-neutral-100">{{ program()!.category }}</span>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-neutral-500 dark:text-neutral-400">Universities</span>
                    <span class="font-semibold text-neutral-800 dark:text-neutral-100">{{ program()!.universities.length }}+ Partners</span>
                  </div>

                  <!-- Countries -->
                  <div class="border-t border-neutral-100 dark:border-neutral-700 pt-4">
                    <div class="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wide mb-2">Countries</div>
                    <div class="flex flex-wrap gap-1.5">
                      @for (c of program()!.countries; track c) {
                        <span class="bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs px-2.5 py-1 rounded-full">
                          {{ c }}
                        </span>
                      }
                    </div>
                  </div>

                  <!-- Recognition -->
                  @if (program()!.recognition.length > 0) {
                    <div class="border-t border-neutral-100 dark:border-neutral-700 pt-4">
                      <div class="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wide mb-2">Recognition</div>
                      <div class="flex flex-wrap gap-1.5">
                        @for (r of program()!.recognition; track r) {
                          <span class="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2.5 py-1 rounded-full font-medium">
                            {{ r }}
                          </span>
                        }
                      </div>
                    </div>
                  }

                  <!-- CTA Buttons -->
                  <div class="space-y-3 pt-2">
                    <a routerLink="/contact"
                       class="flex items-center justify-center bg-blue-700 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200 text-sm">
                      Apply Now
                    </a>
                    <a routerLink="/contact"
                       class="flex items-center justify-center border-2 border-blue-700 text-blue-700 dark:text-blue-400 dark:border-blue-500 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 text-sm">
                      Free Counselling
                    </a>
                  </div>
                </div>
              </div>

              <!-- Back link -->
              <a routerLink="/study-abroad"
                 class="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                ← Back to all programs
              </a>
            </div>
          </div>

        </div>
      </main>

      <!-- Related Programs -->
      <section class="bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800 py-12 px-6">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">Other Programs</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            @for (p of relatedPrograms(); track p.id) {
              <a [routerLink]="['/study-abroad', p.id]"
                 class="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-100 dark:border-neutral-700
                        hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200 text-center group">
                <span class="text-3xl block mb-2">{{ p.icon }}</span>
                <div class="text-sm font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {{ p.title }}
                </div>
                <div class="text-xs text-neutral-400 mt-0.5">{{ p.duration }}</div>
              </a>
            }
          </div>
        </div>
      </section>
    }
  `,
})
export class StudyAbroadDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  program = signal<StudyProgram | null>(null);
  activeTab = signal('overview');

  tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'eligibility', label: 'Eligibility' },
    { key: 'universities', label: 'Universities' },
    { key: 'fees', label: 'Fees' },
    { key: 'process', label: 'How to Apply' },
  ];

  relatedPrograms() {
    const current = this.program();
    if (!current) return [];
    return STUDY_PROGRAMS.filter(p => p.id !== current.id).slice(0, 4);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.program.set(STUDY_PROGRAMS.find(p => p.id === id) ?? null);
  }
}
