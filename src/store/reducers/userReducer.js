const initialState = [];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //register
    case 'USER_REGISTER_REQUEST':
      return { loading: true };

    //register success
    case 'USER_REGISTER_SUCCESS':
      return { loading: false, userInfo: action.payload, error: null };

    //register fail
    case 'USER_REGISTER_FAIL':
      return { loading: false, error: action.payload };

    //login
    case 'USER_LOGIN_REQUEST':
      return { loading: true };

    //login success
    case 'USER_LOGIN_SUCCESS':
      return { loading: false, userInfo: action.payload };

    //login fail
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userReducer;
