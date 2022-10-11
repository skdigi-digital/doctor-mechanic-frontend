import { ADMIN } from "../constants";

const loadAdmin = (admin) => ({
  type: ADMIN.LOAD,
  admin,
});

const setAdmin = (admin) => ({
  type: ADMIN.LOAD_SUCCESS,
  admin,
});

const setError = (error) => ({
  type: ADMIN.LOAD_FAIL,
  error,
});

export { loadAdmin, setAdmin, setError };
