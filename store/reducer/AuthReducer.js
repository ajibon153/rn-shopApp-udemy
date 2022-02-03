import { LOGOUT, AUTHENTICATE } from '../actions/AuthAction';
const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      //console.log('=== AUTHENTICATE ===', action);
      return {
        token: action.token,
        userId: action.userId,
      };

    case LOGOUT:
      //console.log('Logout', initialState);
      return initialState;

    default:
      return state;
  }
};
