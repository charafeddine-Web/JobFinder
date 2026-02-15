import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../core/services/job.service';
import { Job } from '../../../core/models/job.model';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-slate-50 min-h-screen pb-20">
      <div class="max-w-5xl mx-auto px-6 pt-12">
        <!-- Back Button -->
        <button (click)="goBack()" class="flex items-center text-slate-500 hover:text-indigo-600 mb-10 transition-colors group font-bold text-sm tracking-tight">
          <svg class="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Overview
        </button>

        <div *ngIf="job" class="animate-fade-in">
          <!-- Header Card -->
          <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12 mb-8">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                   <div class="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center">
                      <span class="text-indigo-600 font-black text-xl">{{ job.company.substring(0, 1) }}</span>
                   </div>
                   <span class="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg">
                      {{ job.source }}
                   </span>
                </div>
                <h1 class="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">{{ job.title }}</h1>
                <div class="flex flex-wrap items-center gap-6 text-slate-500 font-semibold">
                  <span class="flex items-center gap-2">
                    <svg class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {{ job.company }}
                  </span>
                  <span class="flex items-center gap-2">
                    <svg class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {{ job.location }}
                  </span>
                </div>
              </div>
              
              <div class="flex flex-col gap-3">
                 <a [href]="job.url" target="_blank" 
                   class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 transition-all transform hover:-translate-y-1 text-center">
                   Apply for this position
                 </a>
                 <button class="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <svg class="h-5 w-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Save for later
                 </button>
              </div>
            </div>
          </div>

          <!-- Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-8">
              <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12">
                <h2 class="text-2xl font-bold text-slate-900 mb-6">About the Role</h2>
                <div class="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg font-medium" [innerHTML]="job.description"></div>
              </div>
            </div>

            <div class="space-y-6">
              <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <h3 class="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Quick Overview</h3>
                <div class="space-y-6">
                  <div class="flex items-start gap-4">
                     <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                        <svg class="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                     </div>
                     <div>
                        <p class="text-xs font-black text-slate-400 uppercase">Posted Date</p>
                        <p class="text-slate-900 font-bold mt-0.5">{{ job.datePosted | date:'longDate' }}</p>
                     </div>
                  </div>
                  <div class="flex items-start gap-4">
                     <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                        <svg class="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                     </div>
                     <div>
                        <p class="text-xs font-black text-slate-400 uppercase">Remote Friendly</p>
                        <p class="text-slate-900 font-bold mt-0.5">{{ job.remote ? 'Fully Remote' : 'On-site / Hybrid' }}</p>
                     </div>
                  </div>
                  <div class="flex items-start gap-4">
                     <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                        <svg class="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                     </div>
                     <div>
                        <p class="text-xs font-black text-slate-400 uppercase">Salary Range</p>
                        <p class="text-emerald-700 font-black text-xl mt-0.5 tracking-tighter">{{ job.salary || 'Competitive' }}</p>
                     </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100 overflow-hidden relative group">
                <div class="relative z-10">
                  <h3 class="text-xl font-bold mb-2">Want updates?</h3>
                  <p class="text-indigo-100 text-sm font-medium mb-6 leading-relaxed">Join our mailing list to get the latest jobs in this category sent straight to your inbox.</p>
                  <button class="w-full py-3 bg-white text-indigo-600 font-black rounded-xl hover:bg-indigo-50 transition-all">Enable Alerts</button>
                </div>
                <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="!job" class="flex flex-col items-center justify-center py-40 animate-fade-in">
          <div class="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
          <p class="mt-4 text-slate-500 font-bold tracking-widest uppercase text-xs">Preparing details...</p>
        </div>
      </div>
    </div>
  `
})
export class JobDetailComponent implements OnInit {
  job: Job | null | undefined = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  goBack() {
    this.router.navigate(['/']);
  }
}
