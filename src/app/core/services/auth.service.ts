import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  /** Signal: true when a user is signed in */
  isLoggedIn = signal(false);

  /** Current user signal */
  currentUser = signal(null as any);

  async login(email: string, password: string): Promise<void> {
    // Mock login - accept any email/password for demo
    if (email && password) {
      this.isLoggedIn.set(true);
      this.currentUser.set({ email });
      await this.router.navigate(['/admin']);
    } else {
      throw new Error('Invalid credentials');
    }
  }

  async logout(): Promise<void> {
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    await this.router.navigate(['/']);
  }
}
