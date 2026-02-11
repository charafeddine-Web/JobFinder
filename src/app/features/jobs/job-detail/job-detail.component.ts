import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../../core/services/job.service';
import { Job } from '../../../core/models/job.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs'; // Helper for mock if needed

@Component({
    selector: 'app-job-detail',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div *ngIf="job" class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ job.title }}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          {{ job.company }} - {{ job.location }}
        </p>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Posted on</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ job.datePosted }}</dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Salary</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ job.salary || 'Not specified' }}</dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Source</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ job.source }}</dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Description</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">
              {{ job.description }}
            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Link</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <a [href]="job.url" target="_blank" class="text-indigo-600 hover:text-indigo-900">
                View on original site
              </a>
            </dd>
          </div>
        </dl>
      </div>
      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Apply Now (Mock)
        </button>
      </div>
    </div>
    
    <div *ngIf="!job" class="text-center py-10">
      <p class="text-gray-500">Loading job details...</p>
    </div>
  `
})
export class JobDetailComponent implements OnInit {
    job: Job | null | undefined = null;

    constructor(
        private route: ActivatedRoute,
        private jobService: JobService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.jobService.getJobById(id).subscribe((job: Job | undefined) => {
                this.job = job;
            });
        }
    }
}

