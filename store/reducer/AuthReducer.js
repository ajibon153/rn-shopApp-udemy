import { SIGNUP, SIGNIN, ONAUTH } from '../actions/AuthAction';
const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      //console.log('action', action);

      return {
        token: action.data.accessToken,
        userId: action.data.uid,
      };
    case SIGNIN:
      //console.log('action', action);

      return {
        token: action.data.accessToken,
        userId: action.data.uid,
      };
    default:
      return state;
  }
};
