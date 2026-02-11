import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../../core/models/job.model';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-job-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="space-y-4">
      <div *ngFor="let job of jobs" class="bg-white shadow overflow-hidden sm:rounded-lg hover:shadow-md transition-shadow duration-200">
        <div class="px-4 py-5 sm:px-6">
          <div class="flex justify-between items-center">
            <h3 class="text-lg leading-6 font-medium text-indigo-600 truncate">
              <a [routerLink]="['/dashboard/jobs', job.id]">{{ job.title }}</a>
            </h3>
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              {{ job.source }}
            </span>
          </div>
          <div class="mt-2 max-w-xl text-sm text-gray-500">
            <p>{{ job.company }} • {{ job.location }}</p>
          </div>
          <div class="mt-2 text-sm text-gray-900 line-clamp-2">
            {{ job.description }}
          </div>
          <div class="mt-4 flex justify-between items-center">
            <div class="text-xs text-gray-500">
              Posted: {{ job.datePosted | date }}
            </div>
            <div class="flex space-x-2">
              <button (click)="onFavorite(job)" class="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                Add to Favorites
              </button>
              <a [href]="job.url" target="_blank" class="text-gray-500 hover:text-gray-900 text-sm font-medium">
                View Original
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div *ngIf="jobs.length === 0" class="text-center py-10 text-gray-500">
        No jobs found. Try adjusting your search.
      </div>
    </div>
  `
})
export class JobListComponent {
    @Input() jobs: Job[] = [];
    @Output() favorite = new EventEmitter<Job>();

    onFavorite(job: Job) {
        this.favorite.emit(job);
    }
}
