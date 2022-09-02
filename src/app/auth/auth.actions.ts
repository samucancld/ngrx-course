import { createAction, props } from '@ngrx/store';
import { User } from './model/user.model';

export const login = createAction(
  '[Login] Action',
  props<{user: User}>(),
);

export const logout = createAction(
  '[Logout] Action'
);




