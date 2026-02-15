import { createReducer, on } from '@ngrx/store';
import { Application } from '../../core/models/application.model';
import * as ApplicationActions from './application.actions';

export interface State {
    applications: Application[];
    error: any;
    loading: boolean;
}

export const initialState: State = {
    applications: [],
    error: null,
    loading: false
};

export const applicationReducer = createReducer(
    initialState,
    on(ApplicationActions.loadApplications, state => ({ ...state, loading: true })),
    on(ApplicationActions.loadApplicationsSuccess, (state, { applications }) => ({ ...state, loading: false, applications })),
    on(ApplicationActions.loadApplicationsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ApplicationActions.addApplicationSuccess, (state, { application }) => ({ ...state, applications: [...state.applications, application] })),
    on(ApplicationActions.removeApplicationSuccess, (state, { applicationId }) => ({ ...state, applications: state.applications.filter(a => a.id !== applicationId) }))
);
