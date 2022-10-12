import { put, call, takeEvery } from "redux-saga/effects";

import { setAdmin, setError } from "../actions/admin";
import { ADMIN } from "../constants";
import { fetchAdmin } from "../api";

export function* handleAdminLoad(action) {
  try {
    console.log("Im the sagaaaaaaaaaa")
    const admin = yield call(fetchAdmin, action.admin);
    if (admin && admin.error) throw admin.error;
    yield put(setAdmin(admin));
  } catch (error) {
    console.log("some error",error)
    yield put(setError(error));
  }
}

export default function* watchAdminLoad() {
  yield takeEvery(ADMIN.LOAD, handleAdminLoad);
}