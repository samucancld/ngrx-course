import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { INIT, Store } from '@ngrx/store';
import { defer } from 'rxjs';
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
    () => this.actions$.pipe(
      ofType(INIT),
      map(
        () => login({user: JSON.parse(localStorage.getItem('user'))})
      )
    )
  )

  // init$ = defer(
  //   () => {
  //     const userData = localStorage.getItem('user');
  //     if (userData) {
  //       this.store.dispatch(login(JSON.parse(userData)))
  //     }
  //   }
  // );




  constructor(private actions$: Actions, private router: Router, private store: Store) {}
}
