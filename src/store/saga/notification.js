import { put, call, takeEvery } from "redux-saga/effects";

import { setNotification, setError } from "../actions/notification";
import { NOTIFICATION } from "../constants";
import { fetchNotification } from "../api";

export function* handleNotificationLoad(action) {
  try {
    const notification = yield call(fetchNotification, action.notification);
    if (notification && notification.error) throw notification.error;
    yield put(setNotification(notification));
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* watchNotificationLoad() {
  yield takeEvery(NOTIFICATION.LOAD, handleNotificationLoad);
}
