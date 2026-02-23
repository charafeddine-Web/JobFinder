import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-resources',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.css']
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
            emoji: '\ud83d\udde3\ufe0f',
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
            emoji: '\ud83d\udcb0',
            category: 'Salary',
            title: 'How to Negotiate a 20% Salary Increase',
            description: "Proven negotiation scripts and strategies used by top professionals to command the salary they deserve \u2014 without burning bridges.",
            readTime: '12 min read',
            color: '#10b981, #34d399',
            accentColor: '#059669',
            bgColor: '#ecfdf5',
            borderColor: '#a7f3d0'
        },
        {
            emoji: '\ud83c\udf10',
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
            emoji: '\ud83e\udd1d',
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
            emoji: '\ud83d\udcc8',
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
            emoji: '\ud83d\udcc4',
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
