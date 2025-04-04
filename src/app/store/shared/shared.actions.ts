import { createAction, props } from '@ngrx/store';

export const setLoadingSpinner = createAction(
  'set-loading-action',
  props<{ status: boolean }>()
);
export const setErrorMessage = createAction(
  'show-error-action',
  props<{ message: string }>()
);
