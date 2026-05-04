import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center px-6 py-20
                bg-gradient-to-br from-[#022c20] via-emerald-900 to-neutral-900">
      <div class="absolute inset-0 geo-bg opacity-[0.06]"></div>

      <div class="relative z-10 w-full max-w-md">
        <div class="text-center mb-8">
          <div class="w-16 h-16 rounded-2xl bg-emerald-800 flex items-center justify-center
                      text-yellow-400 font-bold text-3xl font-serif mx-auto mb-4">ﻩ</div>
          <h1 class="font-serif text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p class="text-white/60 text-sm">Sign in to manage packages and jobs</p>
        </div>

        <div class="bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-2xl">
          @if (error()) {
            <div class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-red-600 text-sm flex items-center gap-2">
              ⚠ {{ error() }}
            </div>
          }

          <form [formGroup]="loginForm" (ngSubmit)="login()" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold uppercase tracking-wide text-neutral-400">Email</label>
              <input formControlName="email" type="email" placeholder="admin@alhijaz.com"
                     class="input-f" autocomplete="email">
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold uppercase tracking-wide text-neutral-400">Password</label>
              <input formControlName="password" type="password" placeholder="••••••••"
                     class="input-f" autocomplete="current-password">
            </div>
            <button type="submit" [disabled]="loading()"
                    class="py-4 rounded-xl bg-emerald-800 text-white font-bold text-sm mt-2
                           hover:bg-emerald-700 disabled:opacity-60 transition-all duration-200">
              {{ loading() ? 'Signing in...' : 'Sign In →' }}
            </button>
          </form>

          <div class="mt-6 text-center">
            <a routerLink="/" class="text-sm text-neutral-400 hover:text-emerald-700 transition-colors">
              ← Back to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .input-f {
      padding: 12px 14px; border-radius: 10px; border: 2px solid #e5e7eb;
      background: #f9fafb; font-family: 'DM Sans', sans-serif; font-size: 14px; color: inherit; width: 100%;
    }
    .input-f:focus { outline: none; border-color: #065F46; }
  `],
})
export class LoginComponent {
  private authSvc = inject(AuthService);
  private fb = inject(FormBuilder);

  error   = signal('');
  loading = signal(false);

  loginForm = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  async login(): Promise<void> {
    if (this.loginForm.invalid) return;
    this.loading.set(true);
    this.error.set('');
    try {
      await this.authSvc.login(
        this.loginForm.value.email!,
        this.loginForm.value.password!
      );
    } catch (e: any) {
      this.error.set(e?.message ?? 'Invalid credentials. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}
