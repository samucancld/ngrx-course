import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, EffectSources, ofType } from '@ngrx/effects';
import { INIT, Store } from '@ngrx/store';
import { defer, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { login, logout } from './auth.actions';



@Injectable()
export class AuthEffects {

  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(login),
      tap((action) => localStorage.setItem('user', JSON.stringify(action.user)))
    ),
    { dispatch: false}
  )

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login');
      })
    ),
    { dispatch: false }
  );

  init$ = createEffect(
    () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        return of(login(JSON.parse(userData)))
      } else {
        return of(logout())
      }
    }
  )

  constructor(private actions$: Actions, private router: Router, private store: Store) {}
}
