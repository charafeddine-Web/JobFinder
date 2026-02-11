import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteService } from '../../core/services/favorite.service';
import * as FavoriteActions from './favorite.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class FavoriteEffects {
    private actions$ = inject(Actions);
    private favoriteService = inject(FavoriteService);

    loadFavorites$ = createEffect(() => this.actions$.pipe(
        ofType(FavoriteActions.loadFavorites),
        mergeMap(action => this.favoriteService.getFavorites(action.userId).pipe(
            map(favorites => FavoriteActions.loadFavoritesSuccess({ favorites })),
            catchError(error => of(FavoriteActions.loadFavoritesFailure({ error })))
        ))
    ));

    addFavorite$ = createEffect(() => this.actions$.pipe(
        ofType(FavoriteActions.addFavorite),
        mergeMap(action => this.favoriteService.addFavorite(action.job, action.userId).pipe(
            map(favorite => FavoriteActions.addFavoriteSuccess({ favorite })),
            catchError(error => of(FavoriteActions.addFavoriteFailure({ error })))
        ))
    ));

    removeFavorite$ = createEffect(() => this.actions$.pipe(
        ofType(FavoriteActions.removeFavorite),
        mergeMap(action => this.favoriteService.removeFavorite(action.favoriteId).pipe(
            map(() => FavoriteActions.removeFavoriteSuccess({ favoriteId: action.favoriteId })),
            catchError(error => of(FavoriteActions.removeFavoriteFailure({ error })))
        ))
    ));
}
