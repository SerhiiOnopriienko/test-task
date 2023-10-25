import { TStore } from '../types';

export const LOGIN = '[LOGIN] Enter account';

export const login = (data: TStore) => ({
  type: LOGIN,
  payload: { data },
});
