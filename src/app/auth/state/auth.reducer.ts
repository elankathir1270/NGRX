import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { autoLogout, loginSuccess } from "./auth.actions";


export const authReducer = createReducer(initialState,
  on(loginSuccess, (state,action) => {
    //console.log(action);
    return {
      ...state,
      user : action.user
    }
  }),
  on(autoLogout, (state) => {
    return {
      ...state,
      user : null
    }
  })
)
