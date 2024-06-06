import { sharedReducer } from "./shared/shared.reducer";
import { SharedState } from "./shared/shared.state";

export interface AppState {
  sharedState : SharedState
}

export const appReducer = {
  shared : sharedReducer
}
