import { SERVICE } from "../constants";

const loadService = (service) => ({
  type: SERVICE.LOAD,
  service,
});

const setService = (service) => ({
  type: SERVICE.LOAD_SUCCESS,
  service,
});

const setError = (error) => ({
  type: SERVICE.LOAD_FAIL,
  error,
});

export { loadService, setService, setError };
