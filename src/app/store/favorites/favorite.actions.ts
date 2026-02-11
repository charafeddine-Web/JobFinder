import { createAction, props } from '@ngrx/store';
import { Favorite } from '../../core/models/favorite.model';
import { Job } from '../../core/models/job.model';

export const loadFavorites = createAction(
    '[Favorites Page] Load Favorites',
    props<{ userId: number }>() // Load for specific user
);

export const loadFavoritesSuccess = createAction(
    '[Favorites API] Load Favorites Success',
    props<{ favorites: Favorite[] }>()
);

export const loadFavoritesFailure = createAction(
    '[Favorites API] Load Favorites Failure',
    props<{ error: any }>()
);

export const addFavorite = createAction(
    '[Job List] Add Favorite',
    props<{ job: Job, userId: number }>()
);

export const addFavoriteSuccess = createAction(
    '[Favorites API] Add Favorite Success',
    props<{ favorite: Favorite }>()
);

export const addFavoriteFailure = createAction(
    '[Favorites API] Add Favorite Failure',
    props<{ error: any }>()
);

export const removeFavorite = createAction(
    '[Favorites Page] Remove Favorite',
    props<{ favoriteId: number }>()
);

export const removeFavoriteSuccess = createAction(
    '[Favorites API] Remove Favorite Success',
    props<{ favoriteId: number }>()
);

export const removeFavoriteFailure = createAction(
    '[Favorites API] Remove Favorite Failure',
    props<{ error: any }>()
);
