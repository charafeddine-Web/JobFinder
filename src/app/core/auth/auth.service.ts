import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/users';
    private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) { }

    private getUserFromStorage(): User | null {
        const user = sessionStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    register(user: User): Observable<User> {
        return this.http.get<User[]>(`${this.apiUrl}?email=${user.email}`).pipe(
            switchMap(users => {
                if (users.length > 0) {
                    return throwError(() => new Error('Email already exists'));
                }
                return this.http.post<User>(this.apiUrl, user);
            }),
            tap(() => { })
        );
    }

    login(email: string, password: string): Observable<User> {
        return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
            map(users => {
                if (users && users.length > 0) {
                    const user = users[0];
                    const { password, ...userWithoutPassword } = user;
                    this.storeUser(userWithoutPassword);
                    return userWithoutPassword;
                } else {
                    throw new Error('Invalid email or password. Please try again.');
                }
            })
        );
    }

    logout() {
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
    }

    private storeUser(user: User) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    isAuthenticated(): boolean {
        return !!this.currentUserSubject.value;
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
            tap(updatedUser => {
                const { password, ...userWithoutPassword } = updatedUser;
                this.storeUser(userWithoutPassword);
            })
        );
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`).pipe(
            tap(() => this.logout())
        );
    }
}
