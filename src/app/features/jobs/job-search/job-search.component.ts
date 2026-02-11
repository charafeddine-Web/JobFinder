import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { JobSearchCriteria } from '../../../core/models/job.model';

@Component({
    selector: 'app-job-search',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="bg-white shadow p-6 rounded-lg">
      <form [formGroup]="searchForm" (ngSubmit)="onSearch()" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label for="query" class="block text-sm font-medium text-gray-700">Keywords</label>
          <input type="text" id="query" formControlName="query" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g. Angular Developer">
        </div>
        <div>
          <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
          <input type="text" id="location" formControlName="location" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g. New York">
        </div>
        <div class="flex items-end">
          <button type="submit" class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Search Jobs
          </button>
        </div>
      </form>
    </div>
  `
})
export class JobSearchComponent {
    @Output() search = new EventEmitter<JobSearchCriteria>();
    searchForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.searchForm = this.fb.group({
            query: [''],
            location: ['']
        });
    }

    onSearch() {
        this.search.emit(this.searchForm.value);
    }
}
