import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './favorite.reducer';

export const selectFavoriteState = createFeatureSelector<State>('favorites');

export const selectAllFavorites = createSelector(
    selectFavoriteState,
    (state: State) => state.favorites
);

export const selectFavoritesLoading = createSelector(
    selectFavoriteState,
    (state: State) => state.loading
);
