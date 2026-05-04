import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main class="min-h-screen pt-[72px]">
      <router-outlet />
    </main>
    <app-footer />

    <!-- WhatsApp FAB -->
    <a
      href="https://wa.me/447700900123"
      target="_blank"
      class="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white
             flex items-center justify-center text-2xl shadow-lg hover:scale-110
             transition-transform duration-300"
      title="Chat on WhatsApp"
      aria-label="WhatsApp">
      💬
    </a>
  `,
})
export class AppComponent implements OnInit {
  private theme = inject(ThemeService);

  ngOnInit(): void {
    // ThemeService constructor handles initialization
  }
}
