import { NOTIFICATION } from "../constants";

const loadNotification = (notification) => ({
  type: NOTIFICATION.LOAD,
  notification,
});

const setNotification = (notification) => ({
  type: NOTIFICATION.LOAD_SUCCESS,
  notification,
});

const setError = (error) => ({
  type: NOTIFICATION.LOAD_FAIL,
  error,
});

export { loadNotification, setNotification, setError };
