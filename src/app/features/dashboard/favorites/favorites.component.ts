import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Favorite } from '../../../core/models/favorite.model';
import { selectAllFavorites, selectFavoritesLoading } from '../../../store/favorites/favorite.selectors';
import { loadFavorites, removeFavorite } from '../../../store/favorites/favorite.actions';
import { AuthService } from '../../../core/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-favorites',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="space-y-6">
      <div class="md:flex md:items-center md:justify-between">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          My Favorite Jobs
        </h2>
      </div>

      <div *ngIf="loading$ | async" class="text-center py-10">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p class="mt-2 text-gray-600">Loading favorites...</p>
      </div>

      <div *ngIf="favorites$ | async as favorites">
        <div *ngIf="favorites.length === 0 && !(loading$ | async)" class="text-center py-10 text-gray-500">
          You haven't added any favorites yet.
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div *ngFor="let favorite of favorites" class="bg-white overflow-hidden shadow rounded-lg relative">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 truncate">
                {{ favorite.title }}
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                {{ favorite.company }}
              </p>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                {{ favorite.location }}
              </p>
              <div class="mt-4 flex justify-between">
                 <a [routerLink]="['/dashboard/jobs', favorite.offerId]" class="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                   View Details
                 </a>
                 <button (click)="onRemove(favorite.id)" class="text-red-600 hover:text-red-900 text-sm font-medium">
                   Remove
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FavoritesComponent implements OnInit {
    favorites$: Observable<Favorite[]>;
    loading$: Observable<boolean>;

    constructor(
        private store: Store,
        private authService: AuthService
    ) {
        this.favorites$ = this.store.select(selectAllFavorites);
        this.loading$ = this.store.select(selectFavoritesLoading);
    }

    ngOnInit(): void {
        // Ideally we get userId from auth state or service
        // For now getting it from auth service directly if available or session
        const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        if (user && user.id) {
            this.store.dispatch(loadFavorites({ userId: user.id }));
        }
    }

    onRemove(id: number) {
        this.store.dispatch(removeFavorite({ favoriteId: id }));
    }
}
