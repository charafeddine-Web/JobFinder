import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSearchComponent } from './job-search/job-search.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobService } from '../../core/services/job.service';
import { Job, JobSearchCriteria } from '../../core/models/job.model';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
    selector: 'app-jobs-page',
    standalone: true,
    imports: [CommonModule, JobSearchComponent, JobListComponent],
    template: `
    <div class="space-y-6">
      <div class="md:flex md:items-center md:justify-between">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Find Your Dream Job
        </h2>
      </div>

      <app-job-search (search)="onSearch($event)"></app-job-search>

      <div *ngIf="loading" class="text-center py-10">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p class="mt-2 text-gray-600">Searching jobs...</p>
      </div>

      <div *ngIf="errorMessage" class="bg-red-50 p-4 rounded-md">
        <div class="flex">
          <div class="flex-shrink-0">
            <!-- Icon -->
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ errorMessage }}</p>
            </div>
          </div>
        </div>
      </div>

      <app-job-list *ngIf="!loading" [jobs]="jobs" (favorite)="onFavorite($event)"></app-job-list>
    </div>
  `
})
export class JobsPageComponent {
    jobs: Job[] = [];
    loading = false;
    errorMessage: string | null = null;

    constructor(private jobService: JobService) { }

    onSearch(criteria: JobSearchCriteria) {
        this.loading = true;
        this.errorMessage = null;
        this.jobService.searchJobs(criteria).pipe(
            finalize(() => this.loading = false),
            catchError(err => {
                this.errorMessage = 'Failed to load jobs. Please try again.';
                return of([]);
            })
        ).subscribe(jobs => {
            this.jobs = jobs;
        });
    }

    onFavorite(job: Job) {
        console.log('Add to favorites:', job);
        // TODO: Implement NgRx dispatch
    }
}
