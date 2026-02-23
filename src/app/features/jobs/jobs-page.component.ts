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
  templateUrl: './jobs-page.component.html',
  styleUrls: ['./jobs-page.component.css']
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
    this.searchCriteria$.pipe(
      delay(200),
      tap(() => {
        this.loading = true;
        this.errorMessage = null;
        this.cdr.detectChanges();
      }),
      switchMap(criteria => this.jobService.searchJobs(criteria).pipe(
        catchError(err => {
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
      error: () => {
        this.errorMessage = 'A critical error occurred while loading jobs.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

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
