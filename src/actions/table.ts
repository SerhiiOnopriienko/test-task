import { TStore } from '../types';

export const LOAD_TABLE = '[TABLE] Load Table';

export const loadTable = (data: TStore) => ({
  type: LOAD_TABLE,
  payload: { data },
});
