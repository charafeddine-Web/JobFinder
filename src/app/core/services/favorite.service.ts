import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Favorite } from '../models/favorite.model';
import { Job } from '../models/job.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    private apiUrl = 'http://localhost:3000/favoritesOffers'; // JSON Server

    constructor(private http: HttpClient) { }

    getFavorites(userId: number): Observable<Favorite[]> {
        return this.http.get<Favorite[]>(`${this.apiUrl}?userId=${userId}`);
    }

    addFavorite(job: Job, userId: number): Observable<Favorite> {
        const favorite: Partial<Favorite> = {
            userId,
            offerId: job.id,
            title: job.title,
            company: job.company,
            location: job.location
            // Add other fields as needed for display in favorites list
        };
        return this.http.post<Favorite>(this.apiUrl, favorite as Favorite);
    }

    removeFavorite(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
