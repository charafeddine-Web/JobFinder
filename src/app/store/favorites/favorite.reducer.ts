import { createReducer, on } from '@ngrx/store';
import { Favorite } from '../../core/models/favorite.model';
import * as FavoriteActions from './favorite.actions';

export interface State {
    favorites: Favorite[];
    error: any;
    loading: boolean;
}

export const initialState: State = {
    favorites: [],
    error: null,
    loading: false
};

export const favoriteReducer = createReducer(
    initialState,
    on(FavoriteActions.loadFavorites, state => ({ ...state, loading: true })),
    on(FavoriteActions.loadFavoritesSuccess, (state, { favorites }) => ({ ...state, loading: false, favorites })),
    on(FavoriteActions.loadFavoritesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(FavoriteActions.addFavoriteSuccess, (state, { favorite }) => ({ ...state, favorites: [...state.favorites, favorite] })),
    on(FavoriteActions.removeFavoriteSuccess, (state, { favoriteId }) => ({ ...state, favorites: state.favorites.filter(f => f.id !== favoriteId) }))
);
