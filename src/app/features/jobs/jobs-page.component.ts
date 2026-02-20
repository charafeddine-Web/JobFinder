import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSearchComponent } from './job-search/job-search.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobService } from '../../core/services/job.service';
import { Job, JobSearchCriteria } from '../../core/models/job.model';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { catchError, finalize, take, switchMap, takeUntil, tap, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as FavoriteActions from '../../store/favorites/favorite.actions';
import * as ApplicationActions from '../../store/applications/application.actions';
import { selectAllFavorites } from '../../store/favorites/favorite.selectors';
import { Favorite } from '../../core/models/favorite.model';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-jobs-page',
  standalone: true,
  imports: [CommonModule, JobSearchComponent, JobListComponent],
  template: `
    <div class="min-h-screen relative overflow-hidden">
      <!-- Background Decorative Elements -->
      <div class="absolute top-0 left-0 w-full h-full bg-mesh-aurora -z-10 pointer-events-none"></div>
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute top-1/2 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-float" style="animation-delay: 2s"></div>

      <!-- Hero Section -->
      <section class="relative pt-16 pb-20 md:pt-24 md:pb-32 px-6">
        <div class="max-w-7xl mx-auto text-center space-y-8">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/50 shadow-sm animate-slide-up">
            <span class="flex h-2 w-2 rounded-full bg-orange-600 animate-ping"></span>
            <span class="text-xs font-black uppercase tracking-widest text-orange-950">Over 5,000+ new roles this week</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.1] animate-slide-up" style="animation-delay: 0.1s">
            Find your next <br>
            <span class="gradient-text">Design & Tech</span> career.
          </h1>
          
          <p class="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-medium leading-relaxed animate-slide-up" style="animation-delay: 0.2s">
            Discover thousands of high-paying jobs from the world's most innovative companies. 
            Real-time updates, direct applications, and premium insights.
          </p>

          <!-- Integrated Search -->
          <div class="max-w-5xl mx-auto pt-10 animate-slide-up" style="animation-delay: 0.3s">
            <app-job-search (search)="onSearch($event)"></app-job-search>
          </div>

          <!-- Quick Stats Recap -->
          <div class="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-12 animate-fade-in delay-500">
            <div class="text-center group cursor-default">
              <p class="text-3xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">{{ jobs.length }}+</p>
              <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Listings</p>
            </div>
            <div class="hidden md:block w-px h-8 bg-slate-200"></div>
            <div class="text-center group cursor-default">
              <p class="text-3xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">120k</p>
              <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Companies</p>
            </div>
            <div class="hidden md:block w-px h-8 bg-slate-200"></div>
            <div class="text-center group cursor-default">
              <p class="text-3xl font-black text-slate-900 group-hover:text-orange-500 transition-colors">24/7</p>
              <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest">Instant Support</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content Feed -->
      <section class="max-w-7xl mx-auto px-6 pb-32">
        <div class="space-y-12">
          <!-- Section Heading -->
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
            <div class="space-y-2">
              <h2 class="text-4xl font-black text-slate-900 tracking-tight">Recent <span class="text-orange-600">Opportunities</span></h2>
              <p class="text-slate-500 font-bold flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                Curated jobs matching your skills
              </p>
            </div>
            
            <div class="flex items-center gap-3">
              <span class="text-sm font-bold text-slate-400">Sort by:</span>
              <select class="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 ring-orange-500/20">
                <option>Newest First</option>
                <option>Highest Paid</option>
                <option>Most Relevant</option>
              </select>
            </div>
          </div>

          <!-- Loading Skeleton -->
          <div *ngIf="loading" class="grid grid-cols-1 gap-6 animate-fade-in">
            <div *ngFor="let i of [1,2,3]" class="premium-card p-10 h-64 overflow-hidden relative">
              <div class="flex gap-8">
                <div class="skeleton w-20 h-20 shrink-0"></div>
                <div class="flex-1 space-y-6">
                  <div class="skeleton h-8 w-1/3"></div>
                  <div class="skeleton h-4 w-1/2"></div>
                  <div class="space-y-3">
                    <div class="skeleton h-4 w-full"></div>
                    <div class="skeleton h-4 w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Error Feedback -->
          <div *ngIf="errorMessage" class="premium-card p-20 text-center border-2 border-dashed border-orange-200 bg-orange-50/50 animate-slide-up">
            <div class="w-24 h-24 bg-orange-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
              <svg class="w-12 h-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="text-3xl font-black text-slate-900 mb-4">{{ errorMessage }}</h3>
            <p class="text-slate-500 font-medium mb-10 max-w-md mx-auto">We encountered an issue while retrieving the latest job board data. Don't worry, we've got engineers on it.</p>
            <button (click)="retryLoad()" class="btn btn-primary px-12 py-4 shadow-xl shadow-orange-100">
              Refresh Connection
            </button>
          </div>

          <!-- Job List -->
          <div *ngIf="!loading && !errorMessage" class="animate-fade-in">
            <app-job-list 
              [jobs]="jobs" 
              [favorites]="(favorites$ | async) || []"
              (favorite)="onFavorite($event)"
              (apply)="onApply($event)"
            ></app-job-list>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class JobsPageComponent implements OnInit, OnDestroy {
  jobs: Job[] = [];
  favorites$: Observable<Favorite[]>;
  loading = false;
  errorMessage: string | null = null;

  private searchCriteria$ = new BehaviorSubject<JobSearchCriteria>({ query: '', location: '' });
  private destroy$ = new Subject<void>();

  constructor(
    private jobService: JobService,
    private store: Store,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.favorites$ = this.store.select(selectAllFavorites);
  }

  ngOnInit(): void {
    // Combine search criteria with an initial trigger to ensure jobs load on first visit
    this.searchCriteria$.pipe(
      // Ensure the first load happens after a tiny delay to allow component stability
      delay(200),
      tap(() => {
        this.loading = true;
        this.errorMessage = null;
        this.cdr.detectChanges();
      }),
      switchMap(criteria => this.jobService.searchJobs(criteria).pipe(
        catchError(err => {
          console.error('Error in JobsPageComponent search:', err);
          this.errorMessage = 'Unable to fetch job listings at this moment. Please try again.';
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Critical subscription error:', err);
        this.errorMessage = 'A critical error occurred while loading jobs.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

    // Load favorites if user is logged in
    const user = this.authService.getCurrentUser();
    if (user && user.id) {
      this.store.dispatch(FavoriteActions.loadFavorites({ userId: user.id }));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(criteria: JobSearchCriteria) {
    this.searchCriteria$.next(criteria);
  }

  retryLoad() {
    this.onSearch(this.searchCriteria$.value);
  }

  onFavorite(job: Job) {
    const user = this.authService.getCurrentUser();
    if (!user || !user.id) return;

    this.favorites$.pipe(take(1)).subscribe(favorites => {
      const existing = favorites.find(f => f.offerId === job.id);
      if (existing) {
        this.store.dispatch(FavoriteActions.removeFavorite({ favoriteId: existing.id }));
      } else {
        this.store.dispatch(FavoriteActions.addFavorite({ job, userId: user.id! }));
      }
    });
  }

  onApply(job: Job) {
    const user = this.authService.getCurrentUser();
    if (!user || !user.id) return;

    this.store.dispatch(ApplicationActions.addApplication({ job, userId: user.id }));
  }
}
