import { put, call, takeEvery } from "redux-saga/effects";

import { setService, setError } from "../actions/service";
import { SERVICE } from "../constants";
import { fetchService } from "../api";

export function* handleServiceLoad(action) {
  try {
    const service = yield call(fetchService, action.service);
    if (service && service.error) throw service.error;
    yield put(setService(service));
    console.log("asa=",setService);
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* watchServiceLoad() {
  yield takeEvery(SERVICE.LOAD, handleServiceLoad);
}
