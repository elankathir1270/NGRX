import { createAction, props } from "@ngrx/store";


export const loginStart = createAction('login-start',props<{email: string,password: string}>());
export const loginSuccess = createAction('login-success');
