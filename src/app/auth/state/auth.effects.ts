import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.actions";
import { map, mergeMap } from "rxjs";
import { AuthService } from "src/app/service/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setLoadingSpinner } from "src/app/store/shared/shared.actions";


@Injectable()
export class AuthEffects {

  constructor(private actions: Actions, private authService: AuthService, private store: Store<AppState>) {}

  login = createEffect(() => {
    return this.actions.pipe(ofType(loginStart),mergeMap((action) => {
      //console.log(action.email,action.password);

      return this.authService.login(action.email,action.password).pipe(map((data) => {

        this.store.dispatch(setLoadingSpinner({status: false}))

        const user = this.authService.formatData(data)
        return loginSuccess({user});
      }))
    }))
  })
}
