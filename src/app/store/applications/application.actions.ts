import { createAction, props } from '@ngrx/store';
import { Application } from '../../core/models/application.model';
import { Job } from '../../core/models/job.model';

export const loadApplications = createAction(
    '[Tracking Page] Load Applications',
    props<{ userId: number }>()
);

export const loadApplicationsSuccess = createAction(
    '[Applications API] Load Applications Success',
    props<{ applications: Application[] }>()
);

export const loadApplicationsFailure = createAction(
    '[Applications API] Load Applications Failure',
    props<{ error: any }>()
);

export const addApplication = createAction(
    '[Job List] Add Application',
    props<{ job: Job, userId: number }>()
);

export const addApplicationSuccess = createAction(
    '[Applications API] Add Application Success',
    props<{ application: Application }>()
);

export const addApplicationFailure = createAction(
    '[Applications API] Add Application Failure',
    props<{ error: any }>()
);

export const removeApplication = createAction(
    '[Tracking Page] Remove Application',
    props<{ applicationId: number }>()
);

export const removeApplicationSuccess = createAction(
    '[Applications API] Remove Application Success',
    props<{ applicationId: number }>()
);

export const removeApplicationFailure = createAction(
    '[Applications API] Remove Application Failure',
    props<{ error: any }>()
);

export const updateApplication = createAction(
    '[Tracking Page] Update Application',
    props<{ application: Application }>()
);

export const updateApplicationSuccess = createAction(
    '[Applications API] Update Application Success',
    props<{ application: Application }>()
);

export const updateApplicationFailure = createAction(
    '[Applications API] Update Application Failure',
    props<{ error: any }>()
);
