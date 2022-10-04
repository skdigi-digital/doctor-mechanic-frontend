import { LOGIN } from "../constants";

const loadLogin = (login) => ({
  type: LOGIN.LOAD,
  login,
});

const setLogin = (login) => ({
  type: LOGIN.LOAD_SUCCESS,
  login,
});

const setError = (error) => ({
  type: LOGIN.LOAD_FAIL,
  error,
});

export { loadLogin, setLogin, setError };
