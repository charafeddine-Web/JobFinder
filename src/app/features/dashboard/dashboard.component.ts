import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
    template: `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <h1 class="text-xl font-bold text-indigo-600">JobFinder</h1>
              </div>
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a routerLink="/dashboard" routerLinkActive="border-indigo-500 text-gray-900" [routerLinkActiveOptions]="{exact: true}" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Search Jobs
                </a>
                <a routerLink="/dashboard/favorites" routerLinkActive="border-indigo-500 text-gray-900" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Favorites
                </a>
                <a routerLink="/dashboard/applications" routerLinkActive="border-indigo-500 text-gray-900" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Applications
                </a>
                <a routerLink="/dashboard/profile" routerLinkActive="border-indigo-500 text-gray-900" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Profile
                </a>
              </div>
            </div>
            <div class="flex items-center">
              <button (click)="logout()" class="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div class="py-10">
        <main>
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `
})
export class DashboardComponent {
    constructor(private authService: AuthService) { }

    logout() {
        this.authService.logout();
    }
}
