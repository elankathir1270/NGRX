import { authReducer } from "../auth/state/auth.reducer";
import { AuthState } from "../auth/state/auth.state";
import { sharedReducer } from "./shared/shared.reducer";
import { SharedState } from "./shared/shared.state";

export interface AppState {
  sharedState : SharedState
  authState : AuthState
}

export const appReducer = {
  shared : sharedReducer,
  auth : authReducer
}
