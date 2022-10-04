import { put, call, takeEvery } from "redux-saga/effects";

import { setLogin, setError } from "../actions/login";
import { LOGIN } from "../constants";
import { login } from "../api";

export function* handleLoginLoad(action) {
  try {
    const logindata = yield call(login, action.login);
    if (logindata && logindata.error) throw logindata.error;
    yield put(setLogin(logindata));
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* watchLoginLoad() {
  yield takeEvery(LOGIN.LOAD, handleLoginLoad);
}
