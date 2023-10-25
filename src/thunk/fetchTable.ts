import { getTable, getNextPage, getPreviousPage } from '../api/tableApi';
import { getLogin } from '../api/tableApi';
import { loadTable } from '../actions/table';
import { login } from '../actions/login';
import { AnyAction, Dispatch } from 'redux';
import { TLoginData } from '../types';

export const fetchLogin = (loginData: TLoginData) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const message = await getLogin(loginData);
    dispatch(login(message));
  };
};

export const fetchTable = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const results = await getTable();
    dispatch(loadTable(results));
  };
};

export const fetchNext = (next: string | undefined) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const results = await getNextPage(next);
    dispatch(loadTable(results));
  };
};

export const fetchPrevious = (previous: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const results = await getPreviousPage(previous);
    dispatch(loadTable(results));
  };
};
