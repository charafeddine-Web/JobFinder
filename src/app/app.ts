import { Component, signal, effect } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isDashboard = false;
  mobileMenuOpen = signal(false);

  constructor(private router: Router, public authService: AuthService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isDashboard = event.url.startsWith('/dashboard');
      this.mobileMenuOpen.set(false);
    });

    // Lock body scroll when mobile menu is open (better UX on phone)
    effect(() => {
      const open = this.mobileMenuOpen();
      if (typeof document !== 'undefined') {
        document.body.classList.toggle('mobile-menu-open', open);
      }
    });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
