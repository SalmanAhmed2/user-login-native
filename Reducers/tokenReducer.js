import {ADD_TOKEN} from '../Actions/actions';
const initialState = {
  token: null,
};
const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        token: action.token,
      };
    default:
      return state;
  }
};
export default tokenReducer;
