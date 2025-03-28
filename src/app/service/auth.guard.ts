import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { isAuthenticated } from '../auth/state/auth.selector';
import { map } from 'rxjs';

export const AuthGuard = () => {
  const store = inject<Store<AppState>>(Store);
  const route: Router = inject(Router);

  return store.select(isAuthenticated).pipe(
    map((authenticate) => {
      if (!authenticate) {
        route.navigate(['auth']);
        return false;
      }

      return true;
    })
  );
};
