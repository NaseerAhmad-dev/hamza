import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { JobsService } from '../../core/services/jobs.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <!-- Hero -->
    <div class="relative bg-gradient-to-br from-[#022c20] to-emerald-700 pt-20 pb-16 px-6 md:px-10 overflow-hidden">
      <div class="absolute inset-0 geo-bg opacity-[0.08]"></div>
      <div class="relative z-10 text-center max-w-2xl mx-auto">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4
                     bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-bold tracking-[2px] uppercase">
          📞 Get In Touch
        </span>
        <h1 class="font-serif text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
        <p class="text-white/70 text-base">We'd love to hear from you — packages, jobs, or any queries</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 md:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">

      <!-- Contact Form -->
      <div>
        <h2 class="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Send us a Message</h2>
        <p class="text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed">
          Fill out the form and our team will get back to you within 24 hours.
        </p>

        @if (success()) {
          <div class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700
                      rounded-xl p-5 mb-6 flex items-center gap-3 text-emerald-700 dark:text-emerald-400">
            <span class="text-2xl">✅</span>
            <div>
              <div class="font-bold">Message sent successfully!</div>
              <div class="text-sm">We'll get back to you within 24 hours.</div>
            </div>
          </div>
        }

        <form [formGroup]="contactForm" (ngSubmit)="submit()" class="flex flex-col gap-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="flex flex-col gap-2">
              <label class="label">First Name</label>
              <input formControlName="firstName" placeholder="Ahmed" class="input-f">
            </div>
            <div class="flex flex-col gap-2">
              <label class="label">Last Name</label>
              <input formControlName="lastName" placeholder="Rahman" class="input-f">
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="label">Email Address</label>
            <input formControlName="email" type="email" placeholder="ahmed@example.com" class="input-f">
          </div>
          <div class="flex flex-col gap-2">
            <label class="label">Phone Number</label>
            <input formControlName="phone" type="tel" placeholder="+44 7700 900000" class="input-f">
          </div>
          <div class="flex flex-col gap-2">
            <label class="label">Interested In</label>
            <select formControlName="interest" class="input-f">
              <option>Umrah Package</option>
              <option>Study Abroad</option>
              <option>Overseas Job</option>
              <option>General Inquiry</option>
            </select>
          </div>
          <div class="flex flex-col gap-2">
            <label class="label">Message</label>
            <textarea formControlName="message" rows="5" placeholder="Tell us about your requirements..."
                      class="input-f resize-none"></textarea>
          </div>
          <button type="submit" [disabled]="submitting()"
                  class="py-4 rounded-xl bg-emerald-800 text-white font-bold text-sm
                         hover:bg-emerald-700 disabled:opacity-60 transition-all duration-200">
            {{ submitting() ? 'Sending...' : 'Send Message ✉' }}
          </button>
        </form>
      </div>

      <!-- Contact Info -->
      <div>
        <h2 class="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Get In Touch</h2>
        <p class="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8">
          Visit our office or reach out through any of the channels below. Our friendly team is here to help.
        </p>

        <div class="flex flex-col gap-5 mb-8">
          @for (item of contactItems; track item.title) {
            <div class="flex gap-4 items-start">
              <div class="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center
                          justify-center text-xl flex-shrink-0">{{ item.icon }}</div>
              <div>
                <div class="text-xs font-bold uppercase tracking-wide text-neutral-400 mb-1">{{ item.title }}</div>
                <div class="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed" [innerHTML]="item.value"></div>
              </div>
            </div>
          }
        </div>

        <!-- Map Embed with Pin -->
        <div class="h-96 rounded-2xl overflow-hidden shadow-luxury-lg border border-neutral-200 dark:border-neutral-700 relative group">
          <iframe 
            src="https://www.google.com/maps?q=34.28259529837047,74.4662578&z=17&output=embed" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            title="Hamza Tour and Travels Location">
          </iframe>
          <!-- Open in Maps Button -->
          <a href="https://maps.app.goo.gl/ry2JX7zwjvK2Ceed7" target="_blank" rel="noopener noreferrer"
             class="absolute top-4 right-4 bg-white dark:bg-neutral-800 text-blue-600 px-4 py-2 rounded-lg 
                    font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 z-10">
            📍 Open in Maps
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; }
    .input-f {
      padding: 12px 14px; border-radius: 10px; border: 2px solid #e5e7eb;
      background: #f9fafb; font-family: 'DM Sans', sans-serif; font-size: 14px;
      color: inherit; width: 100%; transition: border-color 0.2s; -webkit-appearance: none;
    }
    :host-context(.dark) .input-f { background: #374151; border-color: #4b5563; }
    .input-f:focus { outline: none; border-color: #065F46; }
  `],
})
export class ContactComponent {
  private jobSvc = inject(JobsService);
  private fb = inject(FormBuilder);

  success    = signal(false);
  submitting = signal(false);

  contactForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName:  ['', Validators.required],
    email:     ['', [Validators.required, Validators.email]],
    phone:     [''],
    interest:  ['Umrah Package'],
    message:   ['', Validators.required],
  });

  contactItems = [
    { icon: '📍', title: 'Office Address',  value: 'Bhat Complex, Tawheed Bagh,<br>Sopore, Jammu and Kashmir 193201, India' },
    { icon: '📞', title: 'Phone',           value: '+91 7006063890<br>+91 7006063890 (WhatsApp)' },
    { icon: '📧', title: 'Email',           value: 'info@hamzatourandtravels.com<br>pilgrim@hamzatourandtravels.com' },
    { icon: '🕐', title: 'Office Hours',    value: 'Mon–Fri: 9:00 AM – 6:00 PM<br>Sat: 10:00 AM – 4:00 PM' },
  ];

  async submit(): Promise<void> {
    if (this.contactForm.invalid) { this.contactForm.markAllAsTouched(); return; }
    this.submitting.set(true);
    await this.jobSvc.saveContact(this.contactForm.value as Record<string, string>);
    this.submitting.set(false);
    this.success.set(true);
    this.contactForm.reset({ interest: 'Umrah Package' });
    setTimeout(() => this.success.set(false), 6000);
  }
}
