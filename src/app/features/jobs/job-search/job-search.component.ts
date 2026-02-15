import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { JobSearchCriteria } from '../../../core/models/job.model';

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="relative max-w-5xl mx-auto">
      <!-- Background Glow Effect -->
      <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
      
      <form [formGroup]="searchForm" (ngSubmit)="onSearch()" 
        class="relative bg-white/80 backdrop-blur-2xl rounded-[2rem] p-2 md:p-3 shadow-2xl border border-white/50 flex flex-col md:flex-row items-stretch gap-2">
        
        <!-- Search Query Input Group -->
        <div class="flex-1 relative group h-16 md:h-20">
          <div class="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <div class="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 group-focus-within:bg-indigo-600 group-focus-within:text-white transition-all duration-300">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <input 
            type="text" 
            formControlName="query" 
            class="w-full h-full pl-20 pr-6 bg-transparent text-slate-900 placeholder-slate-400 font-bold text-lg focus:outline-none" 
            placeholder="Search roles, skills, or companies..."
          >
          <!-- Floating Label / Hint -->
          <span class="absolute top-2 left-20 text-[10px] font-black uppercase tracking-widest text-indigo-400 opacity-0 group-focus-within:opacity-100 transition-opacity">Full-text search</span>
        </div>

        <!-- Vertical Divider -->
        <div class="hidden md:block w-px bg-slate-100 my-4 shadow-sm"></div>

        <!-- Location Input Group -->
        <div class="flex-1 relative group h-16 md:h-20">
          <div class="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <div class="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 group-focus-within:bg-emerald-600 group-focus-within:text-white transition-all duration-300">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
          </div>
          <input 
            type="text" 
            formControlName="location" 
            class="w-full h-full pl-20 pr-6 bg-transparent text-slate-900 placeholder-slate-400 font-bold text-lg focus:outline-none" 
            placeholder="City, state, or remote"
          >
           <span class="absolute top-2 left-20 text-[10px] font-black uppercase tracking-widest text-emerald-400 opacity-0 group-focus-within:opacity-100 transition-opacity">Global locations</span>
        </div>

        <!-- Creative Search Button -->
        <button 
          type="submit" 
          class="h-16 md:h-20 px-10 bg-slate-900 text-white rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-600 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl shadow-slate-200"
        >
          <span>Find Jobs</span>
          <svg class="w-6 h-6 animate-bounce-horizontal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </form>

      <!-- Quick Feedback / Trending Tags -->
      <div class="mt-6 flex flex-wrap items-center justify-center gap-4 animate-fade-in delay-300">
        <span class="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Trending:</span>
        <button (click)="quickSearch('Remote')" class="px-4 py-1.5 rounded-full bg-white border border-slate-100 text-xs font-bold text-slate-600 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">#Remote</button>
        <button (click)="quickSearch('Angular')" class="px-4 py-1.5 rounded-full bg-white border border-slate-100 text-xs font-bold text-slate-600 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">#Angular</button>
        <button (click)="quickSearch('Design')" class="px-4 py-1.5 rounded-full bg-white border border-slate-100 text-xs font-bold text-slate-600 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">#Design</button>
        <button (click)="quickSearch('Berlin')" class="px-4 py-1.5 rounded-full bg-white border border-slate-100 text-xs font-bold text-slate-600 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">#Berlin</button>
      </div>
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

  quickSearch(term: string) {
    if (['Remote', 'Berlin'].includes(term)) {
      this.searchForm.patchValue({ location: term, query: '' });
    } else {
      this.searchForm.patchValue({ query: term, location: '' });
    }
    this.onSearch();
  }
}
