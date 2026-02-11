import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Job, JobSearchCriteria, ArbeitnowResponse, ArbeitnowJob } from '../models/job.model';
import { map, catchError } from 'rxjs/operators';
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
        // Fetch jobs from API
        return this.http.get<ArbeitnowResponse>(this.apiUrl).pipe(
            map(response => {
                // Convert Arbeitnow jobs to our Job model
                const jobs = response.data.map(job => this.mapArbeitnowJobToJob(job));
                this.jobsCache = jobs; // Cache for getJobById

                // Filter by search criteria (client-side)
                return jobs.filter(job => {
                    const matchesQuery = criteria.query
                        ? job.title.toLowerCase().includes(criteria.query.toLowerCase()) ||
                        job.description.toLowerCase().includes(criteria.query.toLowerCase()) ||
                        (job.tags && job.tags.some(tag => tag.toLowerCase().includes(criteria.query.toLowerCase())))
                        : true;

                    const matchesLocation = criteria.location
                        ? job.location.toLowerCase().includes(criteria.location.toLowerCase())
                        : true;

                    return matchesQuery && matchesLocation;
                });
            }),
            catchError(error => {
                console.error('Error fetching jobs from Arbeitnow:', error);
                return of([]); // Return empty array on error
            })
        );
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
