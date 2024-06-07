import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";


export const loginStart = createAction('login-start',props<{email: string,password: string}>());
export const loginSuccess = createAction('login-success',props<{user : User}>());
export const signupStart = createAction('signup-start-action',props<{email:string, password:string}>());
export const signupSuccess = createAction('signup-success',props<{user : User}>());
