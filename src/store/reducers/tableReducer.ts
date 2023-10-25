import { AnyAction } from 'redux';
import { LOAD_TABLE } from '../../actions/table';

const initialState = {
  results: [],
  count: 0,
  next: null,
  previous: null,
};

export const tableReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_TABLE:
      return {
        ...state,
        results: [...action.payload.data.results],
        count: action.payload.data.count,
        next: action.payload.data.next,
        previous: action.payload.data.previous,
      };
    default:
      return state;
  }
};
