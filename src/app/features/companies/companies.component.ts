import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-companies',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {
    companies = [
        {
            name: 'TechFlow Solutions',
            roles: 12,
            description: 'Building the next generation of cloud infrastructure with a focus on developer experience.',
            location: 'Berlin, Germany',
            tags: ['Cloud', 'SaaS', 'Infrastructure']
        },
        {
            name: 'CreativePulse',
            roles: 8,
            description: 'A global design agency pushing the boundaries of interactive digital experiences.',
            location: 'Paris, France',
            tags: ['Design', 'Creative', 'Agency']
        },
        {
            name: 'CloudScale AI',
            roles: 25,
            description: 'Revolutionizing data analysis through innovative machine learning and AI technologies.',
            location: 'Remote / Global',
            tags: ['AI', 'ML', 'Data']
        },
        {
            name: 'BrightBlue Software',
            roles: 15,
            description: 'Developing sustainable fintech solutions that empower the next generation of investors.',
            location: 'London, UK',
            tags: ['Fintech', 'Sustainability', 'Scale']
        },
        {
            name: 'Nova Dynamics',
            roles: 9,
            description: 'Where hardware meets software. Building robotics and automation for smart cities.',
            location: 'Stockholm, Sweden',
            tags: ['Robotics', 'Hardware', 'SmartCity']
        },
        {
            name: 'ElasticMind',
            roles: 20,
            description: 'Empowering teams with flexible collaboration tools designed for the future of work.',
            location: 'New York, USA',
            tags: ['Productivity', 'FutureOfWork', 'Startup']
        }
    ];
}
