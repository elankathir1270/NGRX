import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { authReducer } from '../auth/state/auth.reducer';
import { AuthState } from '../auth/state/auth.state';
import { sharedReducer } from './shared/shared.reducer';
import { SharedState } from './shared/shared.state';

export interface AppState {
  sharedState: SharedState;
  authState: AuthState;
  router: RouterReducerState;
}

export const appReducer = {
  shared: sharedReducer,
  auth: authReducer,
  router: routerReducer,
};
