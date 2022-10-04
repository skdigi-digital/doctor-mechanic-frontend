import { VENDORLOGIN } from "../constants";

const loadVendorLogin = (vendorlogin) => ({
  type: VENDORLOGIN.LOAD,
  vendorlogin,
});

const setVendorLogin = (vendorlogin) => ({
  type: VENDORLOGIN.LOAD_SUCCESS,
  vendorlogin,
});

const setError = (error) => ({
  type: VENDORLOGIN.LOAD_FAIL,
  error,
});

export { loadVendorLogin, setVendorLogin, setError };
