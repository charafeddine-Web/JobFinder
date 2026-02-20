import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/jobs/jobs-page.component').then(m => m.JobsPageComponent) },
    { path: 'companies', loadComponent: () => import('./features/companies/companies.component').then(m => m.CompaniesComponent) },
    { path: 'resources', loadComponent: () => import('./features/resources/resources.component').then(m => m.ResourcesComponent) },
    {
        path: 'auth',
        children: [
            { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
            { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) }
        ]
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        children: [
            { path: '', redirectTo: 'jobs', pathMatch: 'full' },
            { path: 'jobs', loadComponent: () => import('./features/jobs/jobs-page.component').then(m => m.JobsPageComponent) },
            { path: 'jobs/:id', loadComponent: () => import('./features/jobs/job-detail/job-detail.component').then(m => m.JobDetailComponent) },
            { path: 'favorites', loadComponent: () => import('./features/dashboard/favorites/favorites.component').then(m => m.FavoritesComponent) },
            { path: 'applications', loadComponent: () => import('./features/dashboard/applications/applications.component').then(m => m.ApplicationsComponent) },
            { path: 'profile', loadComponent: () => import('./features/dashboard/profile/profile.component').then(m => m.ProfileComponent) }
        ]
    },
    { path: '**', redirectTo: '' }
];

