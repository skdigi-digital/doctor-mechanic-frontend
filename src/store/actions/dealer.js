import { DEALER } from "../constants";

const loadDealer = (dealer) => ({
  type: DEALER.LOAD,
  dealer,
});

const setDealer = (dealer) => ({
  type: DEALER.LOAD_SUCCESS,
  dealer,
});

const setError = (error) => ({
  type: DEALER.LOAD_FAIL,
  error,
});

export { loadDealer, setDealer, setError };
