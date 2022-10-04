import { VENDORS } from "../constants";

const loadVendors = (vendors) => ({
  type: VENDORS.LOAD,
  vendors,
});

const setVendors = (vendors) => ({
  type: VENDORS.LOAD_SUCCESS,
  vendors,
});

const setError = (error) => ({
  type: VENDORS.LOAD_FAIL,
  error,
});

export { loadVendors, setVendors, setError };
