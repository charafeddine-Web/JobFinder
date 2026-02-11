import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { favoriteReducer } from './store/favorites/favorite.reducer';
import { FavoriteEffects } from './store/favorites/favorite.effects';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ favorites: favoriteReducer }),
    provideEffects([FavoriteEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};

