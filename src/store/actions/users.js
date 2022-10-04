import { USERS } from "../constants";

const loadUsers = (users) => ({
  type: USERS.LOAD,
  users,
});

const setUsers = (users) => ({
  type: USERS.LOAD_SUCCESS,
  users,
});

const setError = (error) => ({
  type: USERS.LOAD_FAIL,
  error,
});

export { loadUsers, setUsers, setError };
