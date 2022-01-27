import axios from 'axios';

export const register = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_REGISTER_REQUEST',
    });

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'https://reqres.in/api/register',
      { email, password },
      config
    );

    dispatch({
      type: 'USER_REGISTER_SUCCESS',
      payload: { email, id: data.id, token: data.token },
    });
  } catch (error) {
    dispatch({
      type: 'USER_REGISTER_FAIL',
      payload: error,
    });
  }
};
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_REQUEST_LOGIN',
    });

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'https://reqres.in/api/login',
      { email, password },
      config
    );

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: { email, token: data.token },
    });
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: error,
    });
  }
};
