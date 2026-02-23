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
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
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
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    if (user && user.id) {
      this.store.dispatch(loadFavorites({ userId: user.id }));
    }
  }

  onRemove(id: number) {
    this.store.dispatch(removeFavorite({ favoriteId: id }));
  }
}
