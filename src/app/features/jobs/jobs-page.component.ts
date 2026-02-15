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
    <div class="space-y-10 animate-fade-in pb-20">
      <!-- Dashboard Stats Header -->
     

      <!-- Search Section -->
      <div class="premium-card p-4 md:p-6 shadow-2xl shadow-indigo-100/30">
        <app-job-search (search)="onSearch($event)"></app-job-search>
      </div>

      <!-- Main Content -->
      <div class="space-y-8">
        <!-- Section Heading -->
        <div class="flex items-end justify-between border-b border-slate-100 pb-6 animate-fade-in">
          <div class="space-y-1">
            <h2 class="text-3xl font-black text-slate-900">Discover <span class="gradient-text">Opportunities</span></h2>
            <p class="text-slate-500 font-bold flex items-center gap-2">
              <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Freshly updated today
            </p>
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
        <div *ngIf="errorMessage" class="premium-card p-16 text-center border-2 border-dashed border-rose-200 bg-rose-50/30 animate-slide-up">
          <div class="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-2xl font-black text-slate-900 mb-2">{{ errorMessage }}</h3>
          <button (click)="retryLoad()" class="btn btn-primary px-10 mt-6">
            Try Reconnecting
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
