export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    url: string;
    datePosted: string;
    salary?: string;
    source: string;
    remote?: boolean;
    tags?: string[];
}

export interface JobSearchCriteria {
    query: string;
    location: string;
}

// Arbeitnow API response structure
export interface ArbeitnowJob {
    slug: string;
    company_name: string;
    title: string;
    description: string;
    remote: boolean;
    url: string;
    tags: string[];
    job_types: string[];
    location: string;
    created_at: string;
}

export interface ArbeitnowResponse {
    data: ArbeitnowJob[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        path: string;
        per_page: number;
        to: number;
    };
}
