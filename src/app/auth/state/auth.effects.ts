import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "src/app/service/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { Router } from "@angular/router";


@Injectable()
export class AuthEffects {

  constructor(private actions: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router : Router
  ) {}

  login = createEffect(() => {
    return this.actions.pipe(ofType(loginStart),mergeMap((value) => {
      //console.log(action.email,action.password);

      return this.authService.login(value.email,value.password).pipe(map((data) => {

        this.store.dispatch(setLoadingSpinner({status: false}))
        this.store.dispatch(setErrorMessage({message : ""}))

        const user = this.authService.formatData(data)
        return loginSuccess({user});
      }),
      catchError((errRes) => {
        //const errMsg = errRes.error.error.message
        this.store.dispatch(setLoadingSpinner({status: false}))
        const message = this.authService.getErrorMessage(errRes.error.error.message)

        return of(setErrorMessage({message: message}))
      }))


    }))
  })

  loginRedirect = createEffect(() => {
    return this.actions.pipe(ofType(loginSuccess),
    tap((action) => {
      this.router.navigate(['/'])
    }))
  },{dispatch : false})


}
