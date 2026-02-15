import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { favoriteReducer } from './store/favorites/favorite.reducer';
import { FavoriteEffects } from './store/favorites/favorite.effects';
import { applicationReducer } from './store/applications/application.reducer';
import { ApplicationEffects } from './store/applications/application.effects';
import { authInterceptor } from './core/interceptors/auth.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideStore({
      favorites: favoriteReducer,
      applications: applicationReducer
    }),
    provideEffects([FavoriteEffects, ApplicationEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};

