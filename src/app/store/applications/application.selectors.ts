import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './application.reducer';

export const selectApplicationState = createFeatureSelector<State>('applications');

export const selectAllApplications = createSelector(
    selectApplicationState,
    (state: State) => state.applications
);

export const selectApplicationsLoading = createSelector(
    selectApplicationState,
    (state: State) => state.loading
);

export const selectApplicationsError = createSelector(
    selectApplicationState,
    (state: State) => state.error
);
