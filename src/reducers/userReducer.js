const initialState = {
  isLoggedIn: false
};

const user = (state = {}, action) => {
  switch(action.type) {
    case 'FILL_USER':
      return {...action.payload};
    case 'CLEAR_USER':
      return {...initialState, error: action.error};
    default:
      return state;
  }
};

export default user;
