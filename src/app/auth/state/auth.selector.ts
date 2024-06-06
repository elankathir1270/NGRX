import { createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";


const getAuthState = createFeatureSelector<AuthState>('auth');
