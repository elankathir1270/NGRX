import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.actions";
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
        this.authService.setUserInLocalStorage(user)
        return loginSuccess({user, redirect : true});
      }),
      catchError((errRes) => {
        //const errMsg = errRes.error.error.message
        this.store.dispatch(setLoadingSpinner({status: false}))
        const message = this.authService.getErrorMessage(errRes.error.error.message)

        return of(setErrorMessage({message: message}))
      }))


    }))
  })

  signup = createEffect(() => {
    return this.actions.pipe(ofType(signupStart),mergeMap((value) => {
      return this.authService.signup(value.email,value.password).pipe(map((data) => {

        this.store.dispatch(setErrorMessage({message: ""}))
        this.store.dispatch(setLoadingSpinner({status: false}))

        const user = this.authService.formatData(data)
        this.authService.setUserInLocalStorage(user)
        return signupSuccess({user, redirect : true})
      }),
      catchError((errRes) => {
        this.store.dispatch(setLoadingSpinner({status: false}))
        const message = this.authService.getErrorMessage(errRes)

        return of(setErrorMessage({message: message}))
      })
    )
    }))
  })

  loginRedirect = createEffect(() => {
    return this.actions.pipe(ofType(...[loginSuccess,signupSuccess]),
    tap((action) => {
      if(action.redirect) {
        this.router.navigate(['/'])
      }
    }))
  },{dispatch : false})

  // signupRedirect = createEffect(() => {
  //   return this.actions.pipe(ofType(signupSuccess),
  //   tap((action) => {
  //     this.router.navigate(['/'])
  //   }))
  // }, {dispatch:false})

  autoLogin = createEffect(() => {
    return this.actions.pipe(ofType(autoLogin),
    mergeMap((action) => {
      const user = this.authService.getUserInLocalStorage();
      //console.log(user);
      return of(loginSuccess({user, redirect : false}));
    }))
  })

  logout = createEffect(() => {
    return this.actions.pipe(ofType(autoLogout),
    map((action) => {
      this.authService.logout();
      this.router.navigate(['auth']);
    }))
  }, {dispatch : false})


}
