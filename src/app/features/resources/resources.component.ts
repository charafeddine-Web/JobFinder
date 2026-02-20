import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-resources',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="min-h-screen relative overflow-hidden bg-slate-50">
      <!-- Background Decorative -->
      <div class="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-amber-50/50 to-transparent -z-10"></div>
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute top-1/2 -right-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-float" style="animation-delay: 2s"></div>

      <!-- Hero Section -->
      <section class="relative pt-20 pb-16 px-6">
        <div class="max-w-7xl mx-auto text-center space-y-6">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 animate-slide-up">
            <span class="flex h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
            <span class="text-xs font-black uppercase tracking-widest text-slate-600">Career Toolkit</span>
          </div>

          <h1 class="text-5xl md:text-7xl font-black text-slate-900 leading-tight animate-slide-up" style="animation-delay: 0.1s">
            Level Up Your <br>
            <span class="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Career Game.</span>
          </h1>

          <p class="max-w-2xl mx-auto text-lg text-slate-500 font-medium leading-relaxed animate-slide-up" style="animation-delay: 0.2s">
            Guides, templates, and tools curated by industry experts to help you land your dream job — from resume writing to negotiating your offer.
          </p>
        </div>
      </section>

      <!-- Category Tabs -->
      <section class="max-w-7xl mx-auto px-6 pb-16">
        <div class="flex flex-wrap justify-center gap-3 animate-fade-in">
          <button *ngFor="let cat of categories"
            (click)="activeCategory = cat"
            class="px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300"
            [ngClass]="activeCategory === cat
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
              : 'bg-white text-slate-500 border border-slate-100 hover:border-orange-200 hover:text-orange-600'">
            {{ cat }}
          </button>
        </div>
      </section>

      <!-- Featured Resource -->
      <section class="max-w-7xl mx-auto px-6 pb-16">
        <div class="premium-card overflow-hidden group cursor-pointer">
          <div class="flex flex-col md:flex-row">
            <!-- Visual Side -->
            <div class="md:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 p-12 md:p-16 flex flex-col justify-between relative overflow-hidden min-h-[320px]">
              <div class="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              <div class="absolute top-6 left-6">
                <span class="px-3 py-1 bg-orange-600/20 text-orange-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-orange-500/20">
                  🔥 Featured
                </span>
              </div>
              <div class="relative z-10 mt-10 space-y-4">
                <div class="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl border border-white/10">
                  📄
                </div>
                <h2 class="text-3xl font-black text-white leading-tight">
                  The Ultimate <br> Resume Playbook
                </h2>
                <p class="text-slate-400 font-medium leading-relaxed">
                  A step-by-step guide used by 50K+ professionals to get past ATS filters and land more interviews.
                </p>
              </div>
            </div>
            <!-- Content Side -->
            <div class="md:w-1/2 p-12 md:p-16 flex flex-col justify-between gap-8">
              <div class="space-y-6">
                <div class="flex flex-wrap gap-2">
                  <span class="badge bg-orange-50 text-orange-600 border-orange-100">Resume</span>
                  <span class="badge bg-slate-50 text-slate-600 border-slate-100">Free Guide</span>
                  <span class="badge bg-slate-50 text-slate-600 border-slate-100">30 min read</span>
                </div>
                <ul class="space-y-4">
                  <li *ngFor="let point of featuredPoints" class="flex items-start gap-4">
                    <div class="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg class="w-3 h-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <span class="text-slate-600 font-medium">{{ point }}</span>
                  </li>
                </ul>
              </div>
              <button class="flex items-center gap-3 text-slate-900 font-black group/btn">
                <span class="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white group-hover/btn:bg-orange-600 transition-colors">
                  <svg class="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                </span>
                Download Free Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Resources Grid -->
      <section class="max-w-7xl mx-auto px-6 pb-32">
        <div class="mb-10 flex items-center justify-between">
          <h2 class="text-3xl font-black text-slate-900">All <span class="text-orange-600">Resources</span></h2>
          <span class="text-slate-400 font-bold text-sm">{{ filteredResources.length }} articles</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let resource of filteredResources; let i = index"
               class="premium-card premium-card-interactive group overflow-hidden animate-slide-up"
               [style.animation-delay]="0.05 * i + 's'">

            <!-- Color Accent Bar -->
            <div class="h-1.5 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 [ngStyle]="{'background': 'linear-gradient(to right, ' + resource.color + ')'}"></div>

            <div class="p-8 space-y-5 flex flex-col h-full">
              <!-- Emoji + Category -->
              <div class="flex items-center justify-between">
                <span class="text-4xl">{{ resource.emoji }}</span>
                <span class="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border"
                      [ngStyle]="{'color': resource.accentColor, 'background': resource.bgColor, 'border-color': resource.borderColor}">
                  {{ resource.category }}
                </span>
              </div>

              <!-- Title & Description -->
              <div class="space-y-2 flex-1">
                <h3 class="text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">
                  {{ resource.title }}
                </h3>
                <p class="text-slate-500 font-medium text-sm leading-relaxed line-clamp-3">
                  {{ resource.description }}
                </p>
              </div>

              <!-- Footer -->
              <div class="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div class="flex items-center gap-2 text-slate-400 text-xs font-bold">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ resource.readTime }}
                </div>
                <button class="flex items-center gap-1 text-xs font-black text-orange-600 hover:text-orange-700 group/read">
                  Read More
                  <svg class="w-3.5 h-3.5 group-hover/read:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Newsletter CTA -->
      <section class="max-w-7xl mx-auto px-6 pb-32">
        <div class="premium-card p-12 md:p-20 bg-gradient-to-br from-orange-600 to-amber-600 relative overflow-hidden">
          <div class="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJWMTZoMnYxOHptLTQgMGgtMlYyMGgydjE0em0tNCAwSDI0di04aDR2OHptMTIgMGgtMlYyOGgydjZ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div class="space-y-4 text-center md:text-left">
              <h2 class="text-3xl md:text-4xl font-black text-white leading-tight">
                Get weekly career tips <br>delivered to your inbox.
              </h2>
              <p class="text-white/80 font-medium max-w-md">
                Join 25,000+ professionals who get exclusive job market insights, resume tips, and salary data every week.
              </p>
            </div>
            <div class="w-full md:w-auto flex flex-col sm:flex-row gap-3 shrink-0">
              <input type="email" placeholder="your@email.com"
                class="flex-1 md:w-72 px-6 py-4 rounded-2xl bg-white/20 text-white placeholder-white/60 font-bold backdrop-blur-md border border-white/20 focus:outline-none focus:bg-white/30 focus:border-white/40 transition-all">
              <button class="px-8 py-4 bg-white text-orange-600 font-black rounded-2xl hover:bg-slate-50 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-orange-900/20 whitespace-nowrap">
                Subscribe Free
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ResourcesComponent {
    activeCategory = 'All';

    categories = ['All', 'Resume', 'Interview', 'Salary', 'Career Growth', 'Networking', 'Remote Work'];

    featuredPoints = [
        'Craft an ATS-optimized resume that gets noticed',
        'Choose the right format for your experience level',
        'Quantify your achievements with impactful metrics',
        'Tailor your resume for specific roles and industries',
    ];

    resources = [
        {
            emoji: '🗣️',
            category: 'Interview',
            title: 'The STAR Method: Answer Any Behavioral Question',
            description: 'Master the Situation, Task, Action, Result framework to ace any behavioral interview question with confidence and structure.',
            readTime: '8 min read',
            color: '#f97316, #fb923c',
            accentColor: '#ea580c',
            bgColor: '#fff7ed',
            borderColor: '#fed7aa'
        },
        {
            emoji: '💰',
            category: 'Salary',
            title: 'How to Negotiate a 20% Salary Increase',
            description: "Proven negotiation scripts and strategies used by top professionals to command the salary they deserve — without burning bridges.",
            readTime: '12 min read',
            color: '#10b981, #34d399',
            accentColor: '#059669',
            bgColor: '#ecfdf5',
            borderColor: '#a7f3d0'
        },
        {
            emoji: '🌐',
            category: 'Remote Work',
            title: 'Landing a Remote Job in 2026: A Complete Guide',
            description: 'Everything you need to know about finding, applying to, and thriving in a fully remote position in the modern job market.',
            readTime: '15 min read',
            color: '#3b82f6, #60a5fa',
            accentColor: '#2563eb',
            bgColor: '#eff6ff',
            borderColor: '#bfdbfe'
        },
        {
            emoji: '🤝',
            category: 'Networking',
            title: 'LinkedIn Outreach Templates That Actually Get Replies',
            description: 'Copy-paste templates and strategies for connecting with recruiters, managers, and industry leaders on LinkedIn.',
            readTime: '6 min read',
            color: '#8b5cf6, #a78bfa',
            accentColor: '#7c3aed',
            bgColor: '#f5f3ff',
            borderColor: '#ddd6fe'
        },
        {
            emoji: '📈',
            category: 'Career Growth',
            title: 'From Junior to Senior: A 2-Year Roadmap',
            description: 'A practical, no-fluff guide on how to accelerate your technical and soft skill development to reach senior level faster.',
            readTime: '20 min read',
            color: '#f59e0b, #fbbf24',
            accentColor: '#d97706',
            bgColor: '#fffbeb',
            borderColor: '#fde68a'
        },
        {
            emoji: '📄',
            category: 'Resume',
            title: 'Portfolio vs. Resume: What Employers Actually Want',
            description: 'Understand when to lead with a portfolio and when a classic resume wins, with real examples from recruiters.',
            readTime: '7 min read',
            color: '#ec4899, #f472b6',
            accentColor: '#db2777',
            bgColor: '#fdf2f8',
            borderColor: '#fbcfe8'
        }
    ];

    get filteredResources() {
        if (this.activeCategory === 'All') return this.resources;
        return this.resources.filter(r => r.category === this.activeCategory);
    }
}
