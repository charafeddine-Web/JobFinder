import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
   selector: 'app-dashboard',
   standalone: true,
   imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
   isMobileMenuOpen = signal(false);
   currentUser: any;

   constructor(private authService: AuthService) {
      this.currentUser = this.authService.getCurrentUser();
   }

   toggleMobileMenu() {
      this.isMobileMenuOpen.update(v => !v);
   }

   logout() {
      this.authService.logout();
   }
}
