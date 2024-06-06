import { createReducer, on } from "@ngrx/store";
import { initialState } from "./shared.state";
import { setLoadingSpinner } from "./shared.actions";


export const sharedReducer = createReducer(initialState,
  on(setLoadingSpinner, (state,action) => {
    return {
      ...state,
      showLoading : action.status
    }
  })
)
