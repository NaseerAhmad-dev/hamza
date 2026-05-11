import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between
                px-6 md:px-10
                bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl
                border-b border-neutral-100 dark:border-neutral-800
                transition-all duration-300">

      <!-- Logo -->
      <a routerLink="/" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center
                    text-yellow-400 font-bold text-xl font-serif">ﻩ</div>
        <div>
          <div class="font-serif font-bold text-emerald-800 dark:text-emerald-400 text-lg leading-tight">Hamza Tour and Travels</div>
          <div class="text-[10px] text-neutral-500 tracking-[2px] uppercase">Travel &amp; Recruitment</div>
        </div>
      </a>
      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-1">
        @for (link of navLinks; track link.path) {
          <a [routerLink]="link.path" routerLinkActive="text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20"
             [routerLinkActiveOptions]="{ exact: link.path === '/' }"
             class="px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-300
                    hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20
                    transition-all duration-200">
            {{ link.label }}
          </a>
        }
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <!-- Theme Toggle -->
        <button (click)="theme.toggle()"
                class="w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-700
                       flex items-center justify-center text-base
                       hover:border-yellow-400 hover:text-yellow-500 transition-all duration-200"
                [attr.aria-label]="theme.isDark() ? 'Switch to light mode' : 'Switch to dark mode'">
          {{ theme.isDark() ? '☀' : '🌙' }}
        </button>

        <a routerLink="/contact" class="hidden md:inline-flex px-5 py-2 rounded-lg border
              border-neutral-200 dark:border-neutral-700 text-sm font-medium
              hover:border-emerald-700 hover:text-emerald-700 transition-all duration-200">
          Enquire
        </a>

        @if (auth.isLoggedIn()) {
          <button (click)="auth.logout()"
                  class="px-5 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-sm font-semibold
                         hover:bg-neutral-300 transition-all duration-200">
            Logout
          </button>
        } @else {
          <a routerLink="/admin/login"
             class="hidden md:inline-flex px-5 py-2 rounded-lg bg-emerald-800 text-white text-sm font-semibold
                    hover:bg-emerald-700 transition-all duration-200 shadow-sm">
            Admin
          </a>
        }

        <!-- Hamburger -->
        <button (click)="menuOpen.set(!menuOpen())"
                class="md:hidden flex flex-col gap-[5px] p-2 text-neutral-700 dark:text-neutral-200"
                aria-label="Toggle menu">
          <span class="w-[22px] h-[2px] bg-current rounded transition-transform duration-300"
                [class.rotate-45]="menuOpen()" [class.translate-y-[7px]]="menuOpen()"></span>
          <span class="w-[22px] h-[2px] bg-current rounded transition-opacity duration-300"
                [class.opacity-0]="menuOpen()"></span>
          <span class="w-[22px] h-[2px] bg-current rounded transition-transform duration-300"
                [class.-rotate-45]="menuOpen()" [class.-translate-y-[7px]]="menuOpen()"></span>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div class="fixed inset-0 z-40 bg-white dark:bg-neutral-900 pt-[72px] px-6 pb-10
                flex flex-col gap-2 overflow-y-auto transition-transform duration-300 md:hidden"
         [class.translate-x-full]="!menuOpen()"
         [class.translate-x-0]="menuOpen()">
      @for (link of navLinks; track link.path) {
        <a [routerLink]="link.path" (click)="menuOpen.set(false)"
           routerLinkActive="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700"
           [routerLinkActiveOptions]="{ exact: link.path === '/' }"
           class="block px-4 py-4 rounded-xl text-base font-medium text-neutral-700
                  dark:text-neutral-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/20
                  transition-colors duration-200">
          {{ link.icon }} {{ link.label }}
        </a>
      }
      <div class="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-3">
        <a routerLink="/contact" (click)="menuOpen.set(false)"
           class="block text-center px-5 py-3 rounded-xl border border-emerald-700 text-emerald-700 font-semibold">
          Get a Free Quote
        </a>
      </div>
    </div>
  `,
})
export class NavbarComponent {
  theme = inject(ThemeService);
  auth  = inject(AuthService);
  menuOpen = signal(false);

  navLinks = [
    { path: '/',              label: 'Home',          icon: '🏠' },
    { path: '/umrah',         label: 'Umrah',         icon: '🕌' },
    { path: '/study-abroad',  label: 'Study Abroad',  icon: '🎓' },
    { path: '/jobs',          label: 'Jobs',          icon: '💼' },
    { path: '/about',         label: 'About',         icon: 'ℹ'  },
    { path: '/contact',       label: 'Contact',       icon: '📞' },
  ];
}
