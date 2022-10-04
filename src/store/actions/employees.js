import { EMPLOYEES } from "../constants";

const loadEmployees = (employees) => ({
  type: EMPLOYEES.LOAD,
  employees,
});

const setEmployees = (employees) => ({
  type: EMPLOYEES.LOAD_SUCCESS,
  employees,
});

const setError = (error) => ({
  type: EMPLOYEES.LOAD_FAIL,
  error,
});

export { loadEmployees, setEmployees, setError };
