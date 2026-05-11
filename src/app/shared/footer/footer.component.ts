import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-6 md:px-10">

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          <!-- Brand -->
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center
                          text-yellow-400 font-bold text-xl font-serif">ﻩ</div>
              <span class="font-serif font-bold text-emerald-800 dark:text-emerald-400 text-xl">Hamza Tour and Travels</span>
            </div>
            <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm mb-6">
              Your trusted partner for Umrah pilgrimages, international education, and overseas recruitment since 2008.
              Licensed by the Ministry of Religious Affairs and IATA certified.
            </p>
            <div class="flex gap-3">
              @for (s of socials; track s.label) {
                <a [href]="s.href" target="_blank" [attr.aria-label]="s.label"
                   class="w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-700
                          flex items-center justify-center text-sm text-neutral-500
                          hover:border-emerald-700 hover:text-emerald-700 transition-all duration-200">
                  {{ s.icon }}
                </a>
              }
            </div>
          </div>

          <!-- Services Links -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">Services</h4>
            <ul class="flex flex-col gap-3">
              <li><a routerLink="/umrah" class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-emerald-700 transition-colors">Umrah Packages</a></li>
              <li><a routerLink="/study-abroad" class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-emerald-700 transition-colors">Study Abroad</a></li>
              <li><a routerLink="/contact" class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-emerald-700 transition-colors">Custom Package</a></li>
              <li><a routerLink="/contact" class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-emerald-700 transition-colors">Group Bookings</a></li>
              <li><a routerLink="/contact" class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-emerald-700 transition-colors">Visa Services</a></li>
            </ul>
          </div>

          <!-- Company Links -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">Company</h4>
            <ul class="flex flex-col gap-3">
              <li><a routerLink="/jobs"    class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-emerald-700 transition-colors">Browse Jobs</a></li>
              <li><a routerLink="/about"   class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-emerald-700 transition-colors">About Us</a></li>
              <li><a routerLink="/contact" class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-emerald-700 transition-colors">Contact</a></li>
              <li><a routerLink="/"        class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-emerald-700 transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">Contact Us</h4>
            <ul class="flex flex-col gap-3">
              <li>
                <p class="text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Address</p>
                <a href="https://maps.app.goo.gl/ry2JX7zwjvK2Ceed7" target="_blank"
                   class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-emerald-700 transition-colors">
                  Bhat Complex, Tawheed Bagh, Sopore
                  <br>Jammu and Kashmir 193201
                </a>
              </li>
              <li>
                <p class="text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Phone</p>
                <a href="tel:+917006063890" class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-emerald-700 transition-colors">
                  +91 7006063890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 pt-8
                    border-t border-neutral-100 dark:border-neutral-800">
          <p class="text-xs text-neutral-400">
            © {{ year }} Hamza Tour and Travels. All rights reserved.
          </p>
          <div class="flex gap-6">
            <a href="#" class="text-xs text-neutral-400 hover:text-emerald-700 transition-colors">Privacy Policy</a>
            <a href="#" class="text-xs text-neutral-400 hover:text-emerald-700 transition-colors">Terms of Service</a>
            <a href="#" class="text-xs text-neutral-400 hover:text-emerald-700 transition-colors">Cookie Policy</a>
          </div>
        </div>

        <!-- Credit -->
        <div class="text-center pt-4">
          <p class="text-xs text-neutral-400">
            Designed and developed with ❤️ by Naseer Ahmad
          </p>
        </div>

      </div>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();

  socials = [
    { label: 'Facebook',  icon: 'f', href: '#' },
    { label: 'Instagram', icon: '📷', href: '#' },
    { label: 'Twitter',   icon: '𝕏', href: '#' },
    { label: 'WhatsApp',  icon: '💬', href: 'https://wa.me/917006063890' },
    { label: 'YouTube',   icon: '▶', href: '#' },
  ];
}
