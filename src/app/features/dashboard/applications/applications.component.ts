import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../../core/services/application.service';
import { Application } from '../../../core/models/application.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-applications',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="space-y-6">
      <div class="md:flex md:items-center md:justify-between">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          My Applications
        </h2>
      </div>

      <div *ngIf="loading" class="text-center py-10">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p class="mt-2 text-gray-600">Loading applications...</p>
      </div>

      <div *ngIf="!loading && applications.length === 0" class="text-center py-10 text-gray-500">
        No tracked applications yet.
      </div>

      <div *ngIf="!loading && applications.length > 0" class="flow-root">
        <ul role="list" class="-my-5 divide-y divide-gray-200">
          <li *ngFor="let app of applications" class="py-5">
            <div class="relative focus-within:ring-2 focus-within:ring-indigo-500">
              <h3 class="text-sm font-semibold text-gray-800">
                <a [href]="app.url" target="_blank" class="hover:underline focus:outline-none">
                  <!-- Extend touch target to entire panel -->
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  {{ app.title }}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-600 line-clamp-2">{{ app.company }} - {{ app.location }}</p>
              
              <div class="mt-2 flex space-x-4 relative z-10">
                 <select [(ngModel)]="app.status" (change)="updateStatus(app)" class="text-xs border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                   <option value="pending">Pending</option>
                   <option value="accepted">Accepted</option>
                   <option value="rejected">Rejected</option>
                 </select>
                 
                 <input type="text" [(ngModel)]="app.notes" (blur)="updateNotes(app)" placeholder="Add notes..." class="text-xs border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 flex-1">
                 
                 <button (click)="deleteApp(app.id)" class="text-red-600 hover:text-red-800 text-xs">Delete</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class ApplicationsComponent implements OnInit {
    applications: Application[] = [];
    loading = false;

    constructor(private applicationService: ApplicationService) { }

    ngOnInit(): void {
        const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        if (user && user.id) {
            this.loading = true;
            this.applicationService.getApplications(user.id).subscribe({
                next: (apps) => {
                    this.applications = apps;
                    this.loading = false;
                },
                error: () => this.loading = false
            });
        }
    }

    updateStatus(app: Application) {
        this.applicationService.updateApplication(app).subscribe();
    }

    updateNotes(app: Application) {
        this.applicationService.updateApplication(app).subscribe();
    }

    deleteApp(id: number) {
        if (confirm('Are you sure?')) {
            this.applicationService.deleteApplication(id).subscribe(() => {
                this.applications = this.applications.filter(a => a.id !== id);
            });
        }
    }
}
