import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApplicationService } from '../../core/services/application.service';
import * as ApplicationActions from './application.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Application } from '../../core/models/application.model';

@Injectable()
export class ApplicationEffects {
    private actions$ = inject(Actions);
    private applicationService = inject(ApplicationService);

    loadApplications$ = createEffect(() => this.actions$.pipe(
        ofType(ApplicationActions.loadApplications),
        mergeMap(action => this.applicationService.getApplications(action.userId).pipe(
            map(applications => ApplicationActions.loadApplicationsSuccess({ applications })),
            catchError(error => of(ApplicationActions.loadApplicationsFailure({ error })))
        ))
    ));

    addApplication$ = createEffect(() => this.actions$.pipe(
        ofType(ApplicationActions.addApplication),
        mergeMap(action => {
            const application: Omit<Application, 'id'> = {
                userId: action.userId,
                offerId: action.job.id,
                apiSource: action.job.source,
                title: action.job.title,
                company: action.job.company,
                location: action.job.location,
                url: action.job.url,
                status: 'pending',
                dateAdded: new Date().toISOString()
            };
            return this.applicationService.addApplication(application).pipe(
                map(res => ApplicationActions.addApplicationSuccess({ application: res })),
                catchError(error => of(ApplicationActions.addApplicationFailure({ error })))
            );
        })
    ));

    removeApplication$ = createEffect(() => this.actions$.pipe(
        ofType(ApplicationActions.removeApplication),
        mergeMap(action => this.applicationService.deleteApplication(action.applicationId).pipe(
            map(() => ApplicationActions.removeApplicationSuccess({ applicationId: action.applicationId })),
            catchError(error => of(ApplicationActions.removeApplicationFailure({ error })))
        ))
    ));

    updateApplication$ = createEffect(() => this.actions$.pipe(
        ofType(ApplicationActions.updateApplication),
        mergeMap(action => this.applicationService.updateApplication(action.application).pipe(
            map(application => ApplicationActions.updateApplicationSuccess({ application })),
            catchError(error => of(ApplicationActions.updateApplicationFailure({ error })))
        ))
    ));
}
