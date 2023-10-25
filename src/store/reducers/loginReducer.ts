import { AnyAction } from 'redux';
import { LOGIN } from '../../actions/login';

const initialState = {
  message: '',
};

export const loginReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        message: action.payload.data.message,
      };
    default:
      return state;
  }
};
