import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Get the token from storage (in your case, it seems you store the user object)
    // If you had a token, you'd retrieve it here.
    const userJson = sessionStorage.getItem('currentUser');
    let token = null;

    if (userJson) {
        const user = JSON.parse(userJson);
        token = user.token; // Assuming there might be a token field later
    }

    // Clone the request and add the authorization header if token exists
    let authReq = req;
    if (token) {
        authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                // Handle unauthorized error (e.g., redirect to login)
                authService.logout();
                router.navigate(['/auth/login']);
            }
            return throwError(() => error);
        })
    );
};
