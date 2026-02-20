import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Favorite } from '../../../core/models/favorite.model';
import { selectAllFavorites, selectFavoritesLoading } from '../../../store/favorites/favorite.selectors';
import { loadFavorites, removeFavorite } from '../../../store/favorites/favorite.actions';
import { AuthService } from '../../../core/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-10 animate-fade-in pb-20">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-xs font-black uppercase tracking-wider">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Wishlist
          </div>
          <h2 class="text-4xl font-black text-slate-900 tracking-tight leading-none">Saved <span class="gradient-text">Opportunities</span></h2>
          <p class="text-lg text-slate-400 font-medium">Your curated list of high-impact roles</p>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="premium-card px-6 py-3 flex items-center gap-3">
             <div class="flex -space-x-2">
                <div *ngFor="let i of [1,2,3]" class="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                  {{ i }}
                </div>
             </div>
             <span class="text-slate-900 font-black text-sm">{{ (favorites$ | async)?.length || 0 }} Positions</span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading$ | async" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div *ngFor="let i of [1,2,3]" class="premium-card p-8 space-y-6">
           <div class="flex justify-between">
              <div class="skeleton w-14 h-14 rounded-2xl"></div>
              <div class="skeleton w-8 h-8 rounded-lg"></div>
           </div>
           <div class="space-y-3">
              <div class="skeleton h-6 w-3/4"></div>
              <div class="skeleton h-4 w-1/2"></div>
           </div>
           <div class="skeleton h-12 w-full rounded-xl"></div>
        </div>
      </div>

      <div *ngIf="!(loading$ | async) && (favorites$ | async) as favorites">
        <!-- Empty State -->
        <div *ngIf="favorites.length === 0" class="premium-card py-32 text-center border-2 border-dashed border-orange-100 bg-orange-50/20">
          <div class="w-24 h-24 bg-white rounded-[40px] shadow-2xl shadow-orange-100 flex items-center justify-center mx-auto mb-8 animate-float">
             <svg class="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
             </svg>
          </div>
          <h3 class="text-3xl font-black text-slate-900 mb-4 tracking-tight">Your collection is empty</h3>
          <p class="text-slate-500 text-lg font-medium mb-10 max-w-md mx-auto leading-relaxed">
            Start exploring thousands of jobs and save the ones that catch your eye.
          </p>
          <a routerLink="/dashboard/jobs" class="inline-flex items-center justify-center h-14 px-10 bg-orange-600 text-white font-black rounded-2xl shadow-2xl shadow-orange-200 hover:bg-orange-700 hover:scale-[1.02] active:scale-95 transition-all">
            Explore Jobs
          </a>
        </div>

        <!-- Creative Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let favorite of favorites" class="premium-card premium-card-interactive group overflow-hidden flex flex-col h-full bg-white/80">
            <!-- Glassmorphic Header -->
            <div class="p-8 pb-4 relative flex-1">
              <div class="flex items-start justify-between mb-6">
                 <div class="relative">
                    <div class="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span class="text-2xl font-black gradient-text">
                        {{ favorite.company.substring(0, 1) }}
                      </span>
                    </div>
                    <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 border-4 border-white rounded-full"></div>
                 </div>
                 
                 <button (click)="onRemove(favorite.id)" class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 border border-transparent transition-all duration-300">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                 </button>
              </div>
              
              <div class="space-y-3">
                <h3 class="text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                   {{ favorite.title }}
                </h3>
                <div class="flex items-center gap-2">
                   <p class="text-orange-600 text-sm font-black">{{ favorite.company }}</p>
                   <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                   <span class="text-slate-400 text-xs font-bold uppercase tracking-widest">{{ favorite.location }}</span>
                </div>
              </div>
            </div>
            
            <!-- Bottom Link -->
            <div class="px-8 py-6 bg-slate-50/50 border-t border-slate-100 mt-auto">
               <a [routerLink]="['/dashboard/jobs', favorite.offerId]" class="flex items-center justify-center w-full h-12 bg-slate-900 text-white rounded-xl text-sm font-black hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-200">
                 Apply Now
                 <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                 </svg>
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<Favorite[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store,
    private authService: AuthService
  ) {
    this.favorites$ = this.store.select(selectAllFavorites);
    this.loading$ = this.store.select(selectFavoritesLoading);
  }

  ngOnInit(): void {
    // Ideally we get userId from auth state or service
    // For now getting it from auth service directly if available or session
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    if (user && user.id) {
      this.store.dispatch(loadFavorites({ userId: user.id }));
    }
  }

  onRemove(id: number) {
    this.store.dispatch(removeFavorite({ favoriteId: id }));
  }
}
