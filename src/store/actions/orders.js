import { ORDERS } from "../constants";

const loadOrders = (orders) => ({
  type: ORDERS.LOAD,
  orders,
});

const setOrders = (orders) => ({
  type: ORDERS.LOAD_SUCCESS,
  orders,
});

const setError = (error) => ({
  type: ORDERS.LOAD_FAIL,
  error,
});

export { loadOrders, setOrders, setError };
