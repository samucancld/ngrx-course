import { Action, createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';
import { User } from './model/user.model';


export const authFeatureKey = 'auth';

export interface AuthState {
  loggedIn: boolean;
  user?: User;
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  // user: {id: '', email: ''}
};

export const reducer = createReducer(
  initialAuthState,
  on(login, (state, payload) => {
    return {...state, loggedIn: true, user: payload.user}
  }),
  on(logout, (state) =>{
    let newState = {...state, loggedIn: false, user: {id: '', email: ''}};
    delete newState.user;
    return newState;
  })
);
