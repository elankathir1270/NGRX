import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.actions";
import { map, mergeMap } from "rxjs";
import { AuthService } from "src/app/service/auth.service";




@Injectable()
export class AuthEffects {

  constructor(private actions: Actions, private authService: AuthService) {}

  login = createEffect(() => {
    return this.actions.pipe(ofType(loginStart),mergeMap((action) => {
      //console.log(action.email,action.password);
      return this.authService.login(action.email,action.password).pipe(map((data) => {
        return loginSuccess();
      }))
    }))
  })
}
