import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Job, JobSearchCriteria, ArbeitnowResponse, ArbeitnowJob } from '../models/job.model';
import { map, catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class JobService {
    private apiUrl = environment.jobApiUrl;
    private jobsCache: Job[] = [];

    constructor(private http: HttpClient) { }

    /**
     * Search jobs using Arbeitnow API
     * Note: Arbeitnow doesn't support keyword search in API, so we fetch all jobs and filter client-side
     */
    searchJobs(criteria: JobSearchCriteria): Observable<Job[]> {
        // Fetch jobs from API with a 6-second timeout for better UX
        return this.http.get<ArbeitnowResponse>(this.apiUrl).pipe(
            timeout(6000), // Automaticaly fall back to mocks if API is too slow
            map((response: ArbeitnowResponse) => {
                if (!response || !response.data) {
                    console.warn('Arbeitnow API returned empty or invalid data');
                    return this.getMockJobs(); // Fallback to mocks even if response is valid but empty
                }

                const jobs = response.data.map((job: ArbeitnowJob) => this.mapArbeitnowJobToJob(job));
                this.jobsCache = jobs;
                return this.filterJobs(jobs, criteria);
            }),
            catchError(error => {
                console.error('Error or timeout fetching jobs, using fallback mocks:', error);
                const mockJobs = this.getMockJobs();
                this.jobsCache = mockJobs;
                return of(this.filterJobs(mockJobs, criteria));
            })
        );
    }

    private filterJobs(jobs: Job[], criteria: JobSearchCriteria): Job[] {
        return jobs.filter(job => {
            const matchesQuery = !criteria.query ||
                job.title.toLowerCase().includes(criteria.query.toLowerCase()) ||
                job.description.toLowerCase().includes(criteria.query.toLowerCase()) ||
                (job.tags && job.tags.some(tag => tag.toLowerCase().includes(criteria.query.toLowerCase())));

            const matchesLocation = !criteria.location ||
                job.location.toLowerCase().includes(criteria.location.toLowerCase());

            return matchesQuery && matchesLocation;
        });
    }

    private getMockJobs(): Job[] {
        return [
            {
                id: 'mock-1',
                title: 'Senior Frontend Developer (Angular)',
                company: 'TechFlow Solutions',
                location: 'Berlin, Germany',
                description: 'We are looking for an expert in Angular...',
                url: '#',
                datePosted: new Date().toISOString(),
                source: 'internal',
                remote: true,
                tags: ['angular', 'typescript', 'frontend']
            },
            {
                id: 'mock-2',
                title: 'Full Stack Engineer (Node.js/React)',
                company: 'CloudScale AI',
                location: 'Remote',
                description: 'Join our team to build next-gen AI tools...',
                url: '#',
                datePosted: new Date().toISOString(),
                source: 'internal',
                remote: true,
                tags: ['nodejs', 'react', 'fullstack']
            },
            {
                id: 'mock-3',
                title: 'Product Designer (UX/UI)',
                company: 'CreativePulse',
                location: 'Paris, France',
                description: 'Lead the design of our new mobile application...',
                url: '#',
                datePosted: new Date().toISOString(),
                source: 'internal',
                remote: false,
                tags: ['design', 'figma', 'ux']
            }
        ];
    }

    /**
     * Get job by ID
     * First checks cache, then fetches from API if needed
     */
    getJobById(id: string): Observable<Job | undefined> {
        // Check cache first
        const cachedJob = this.jobsCache.find(j => j.id === id);
        if (cachedJob) {
            return of(cachedJob);
        }

        // If not in cache, fetch all jobs and find the one we need
        return this.http.get<ArbeitnowResponse>(this.apiUrl).pipe(
            map(response => {
                const jobs = response.data.map(job => this.mapArbeitnowJobToJob(job));
                this.jobsCache = jobs;
                return jobs.find(j => j.id === id);
            }),
            catchError(error => {
                console.error('Error fetching job by ID:', error);
                return of(undefined);
            })
        );
    }

    /**
     * Map Arbeitnow API response to our Job model
     */
    private mapArbeitnowJobToJob(arbeitnowJob: ArbeitnowJob): Job {
        return {
            id: arbeitnowJob.slug,
            title: arbeitnowJob.title,
            company: arbeitnowJob.company_name,
            location: arbeitnowJob.location,
            description: arbeitnowJob.description,
            url: arbeitnowJob.url,
            datePosted: arbeitnowJob.created_at,
            source: 'arbeitnow',
            remote: arbeitnowJob.remote,
            tags: arbeitnowJob.tags
        };
    }
}
