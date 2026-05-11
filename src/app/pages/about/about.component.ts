import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Hero -->
    <div class="relative bg-gradient-to-br from-[#022c20] to-emerald-700 pt-20 pb-16 px-6 md:px-10 overflow-hidden">
      <div class="absolute inset-0 geo-bg opacity-[0.08]"></div>
      <div class="relative z-10 text-center max-w-2xl mx-auto">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4
                     bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-bold tracking-[2px] uppercase">
          ✦ Our Story
        </span>
        <h1 class="font-serif text-4xl md:text-6xl font-bold text-white mb-4">About Hamza Tour and Travels</h1>
        <p class="text-white/70 text-base">A legacy of trust, devotion, and excellence since 2008</p>
      </div>
    </div>

    <!-- Story Section -->
    <section class="max-w-7xl mx-auto px-6 md:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div class="relative h-[480px] rounded-3xl overflow-hidden geo-bg"
           style="background:linear-gradient(135deg,#022c20,#065F46)">
        <div class="absolute inset-0 flex items-center justify-center text-[120px]">🕌</div>
      </div>
      <div>
        <div class="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-3">Our Journey</div>
        <div class="w-14 h-0.5 bg-gradient-to-r from-emerald-700 to-yellow-500 mb-6"></div>
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
          Serving Pilgrims & Professionals Since 2008
        </h2>
        <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
          Hamza Tour and Travels was founded with a single mission: to make the sacred pilgrimage
          accessible, comfortable, and spiritually enriching for every Muslim, while connecting skilled
          professionals with global opportunities.
        </p>
        <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
          Over 15 years, we have served more than 1,200 Umrah pilgrims and helped 500+ students pursue
          education abroad, earning the trust of families across the UK, Europe, and South Asia.
        </p>
        <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8">
          Our recruitment division has placed over 300 professionals in top-tier roles across the Gulf,
          Europe, and beyond. Every placement is made with care, integrity, and deep understanding.
        </p>
        <div class="flex flex-wrap gap-3">
          @for (cert of certifications; track cert) {
            <span class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700
                         text-sm font-semibold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800">
              {{ cert }}
            </span>
          }
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="bg-neutral-50 dark:bg-neutral-900 py-20">
      <div class="max-w-7xl mx-auto px-6 md:px-10">
        <div class="text-center mb-14">
          <div class="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-3">By The Numbers</div>
          <h2 class="font-serif text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">Our Impact</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          @for (stat of stats; track stat.label) {
            <div class="bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700
                        rounded-2xl p-8 text-center hover:shadow-luxury transition-shadow duration-300">
              <div class="font-serif text-5xl font-bold mb-3"
                   [class.text-emerald-700]="$even" [class.text-yellow-600]="$odd">{{ stat.value }}</div>
              <div class="text-sm text-neutral-500 dark:text-neutral-400 font-medium">{{ stat.label }}</div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="max-w-7xl mx-auto px-6 md:px-10 py-20">
      <div class="text-center mb-14">
        <div class="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-3">Our Team</div>
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          The People Behind Your Journey
        </h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        @for (member of team; track member.name) {
          <div class="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-100
                      dark:border-neutral-700 text-center hover:-translate-y-1 hover:shadow-luxury
                      transition-all duration-300">
            <div class="h-40 flex items-center justify-center text-6xl"
                 style="background:linear-gradient(135deg,#022c20,#065F46)">{{ member.avatar }}</div>
            <div class="px-3 py-4">
              <div class="font-bold text-sm text-neutral-900 dark:text-neutral-100 leading-tight mb-1">{{ member.name }}</div>
              <div class="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">{{ member.role }}</div>
            </div>
          </div>
        }
      </div>
    </section>

    <!-- CTA -->
    <div class="mx-6 md:mx-10 mb-20">
      <div class="rounded-2xl bg-gradient-to-br from-[#022c20] to-emerald-700 p-12 text-center relative overflow-hidden">
        <div class="absolute inset-0 geo-bg opacity-5"></div>
        <div class="relative z-10">
          <h2 class="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Ready to Journey with Us?</h2>
          <p class="text-white/70 max-w-lg mx-auto mb-8">Plan your Umrah, study abroad, or explore career opportunities with Hamza Tour and Travels.</p>
          <div class="flex flex-wrap gap-4 justify-center">
            <a routerLink="/umrah" class="px-8 py-4 rounded-full bg-yellow-400 text-neutral-900 font-bold text-sm hover:bg-yellow-300 transition-colors">
              Browse Packages
            </a>
            <a routerLink="/contact" class="px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AboutComponent {
  certifications = ['✈ IATA Certified', '☪ Ministry Approved', '🌟 ISO 9001:2015', '🏅 ABTA Member'];

  stats = [
    { value: '15+',    label: 'Years of Service'  },
    { value: '1,200+', label: 'Umrah Pilgrims'    },
    { value: '500+',   label: 'Students Placed'   },
    { value: '300+',   label: 'Jobs Placed'       },
  ];

  team = [
    { avatar: '👨‍💼', name: 'Sheikh Abdullah Rahman', role: 'Founder & CEO' },
    { avatar: '👩‍💼', name: 'Fatima Al-Zahra',        role: 'Head of Education Services' },
    { avatar: '👨‍💼', name: 'Yusuf Mahmood',           role: 'Umrah Coordinator' },
    { avatar: '👩‍💼', name: 'Sara Hussain',            role: 'Recruitment Manager' },
    { avatar: '👨‍💼', name: 'Omar Farooq',             role: 'Islamic Scholar & Guide' },
    { avatar: '👩‍💼', name: 'Aisha Malik',             role: 'Customer Relations' },
  ];
}
