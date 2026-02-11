import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/application.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private apiUrl = 'http://localhost:3000/applications';

    constructor(private http: HttpClient) { }

    getApplications(userId: number): Observable<Application[]> {
        return this.http.get<Application[]>(`${this.apiUrl}?userId=${userId}`);
    }

    addApplication(application: Omit<Application, 'id'>): Observable<Application> {
        return this.http.post<Application>(this.apiUrl, application);
    }

    updateApplication(application: Application): Observable<Application> {
        return this.http.put<Application>(`${this.apiUrl}/${application.id}`, application);
    }

    deleteApplication(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
