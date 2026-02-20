import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
   selector: 'app-dashboard',
   standalone: true,
   imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
   template: `
    <div class="flex h-screen bg-[#F8FAFC] selection:bg-orange-500 selection:text-white overflow-hidden relative">

      <!-- Background Decorative Elements -->
      <div class="fixed top-0 right-0 w-[50%] h-[50%] bg-orange-50/50 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div class="fixed bottom-0 left-0 w-[30%] h-[30%] bg-amber-50/50 blur-[100px] rounded-full -z-10 animate-pulse" style="animation-delay: 2s"></div>

      <!-- Mobile Sidebar Overlay -->
      <div *ngIf="isMobileMenuOpen()"
           (click)="toggleMobileMenu()"
           class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300">
      </div>

      <!-- Sidebar Navigation -->
      <aside [class.translate-x-0]="isMobileMenuOpen()"
             class="fixed lg:relative lg:translate-x-0 -translate-x-full w-72 h-full bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col shrink-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">

        <!-- Logo Branding -->
        <div class="h-24 flex items-center px-8">
           <a routerLink="/" class="flex items-center gap-3 group">
              <div class="w-10 h-10 bg-gradient-to-br from-orange-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200 rotate-[-6deg] group-hover:rotate-0 transition-all duration-500">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span class="text-2xl font-black text-slate-900 tracking-tighter">Job<span class="gradient-text">Finder</span></span>
           </a>
        </div>

        <!-- Scrollable Nav -->
        <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div class="px-4 mb-4">
             <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Navigation</span>
          </div>

          <a routerLink="/dashboard/jobs" routerLinkActive="premium-nav-active" [routerLinkActiveOptions]="{exact: true}"
             (click)="isMobileMenuOpen() && toggleMobileMenu()"
             class="premium-nav-item group">
            <div class="nav-icon-bg">
               <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
            </div>
            <span>Discover Roles</span>
          </a>

          <a routerLink="/dashboard/favorites" routerLinkActive="premium-nav-active"
             (click)="isMobileMenuOpen() && toggleMobileMenu()"
             class="premium-nav-item group">
            <div class="nav-icon-bg">
               <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               </svg>
            </div>
            <span>Saved Jobs</span>
          </a>

          <a routerLink="/dashboard/applications" routerLinkActive="premium-nav-active"
             (click)="isMobileMenuOpen() && toggleMobileMenu()"
             class="premium-nav-item group">
            <div class="nav-icon-bg">
               <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
               </svg>
            </div>
            <span>My Tracker</span>
            <div class="ml-auto w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
               <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </a>

          <div class="px-4 mt-10 mb-4">
             <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Personal</span>
          </div>

          <a routerLink="/dashboard/profile" routerLinkActive="premium-nav-active"
             (click)="isMobileMenuOpen() && toggleMobileMenu()"
             class="premium-nav-item group">
            <div class="nav-icon-bg">
               <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
            </div>
            <span>Profile Settings</span>
          </a>
        </nav>

        <!-- User Profile Footer -->
        <div class="p-6 border-t border-slate-100 bg-slate-50/30">
           <div class="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm mb-4">
              <div class="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black">
                 {{ currentUser?.firstName?.substring(0, 1) }}
              </div>
              <div class="min-w-0">
                 <p class="text-sm font-black text-slate-900 truncate">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</p>
                 <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Professional</p>
              </div>
           </div>
           <button (click)="logout()" class="w-full h-12 flex items-center justify-center gap-2 text-rose-500 font-black text-sm rounded-xl hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
           </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden relative">

        <!-- Premium Mobile Header -->
        <header class="h-20 bg-white/60 backdrop-blur-md border-b border-white lg:bg-transparent lg:border-none flex items-center justify-between px-6 lg:px-12 shrink-0 z-30">
           <div class="flex items-center gap-4">
              <button (click)="toggleMobileMenu()" class="lg:hidden w-11 h-11 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 class="text-xl font-black text-slate-900 tracking-tight lg:hidden">Dashboard</h2>
           </div>

           <div class="flex items-center gap-3">
              <div class="hidden sm:flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm">
                 <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                 <span class="text-xs font-black text-slate-600 tracking-wide uppercase">System Online</span>
              </div>

           </div>
        </header>

        <!-- Main Content with smooth scroll -->
        <main class="flex-1 overflow-y-auto p-6 lg:p-12">
           <div class="max-w-7xl mx-auto">
              <router-outlet></router-outlet>
           </div>
        </main>
      </div>
    </div>
  `
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
