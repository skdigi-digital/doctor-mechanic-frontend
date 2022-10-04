import { put, call, takeEvery } from "redux-saga/effects";

import { setVendorLogin, setError } from "../actions/vendorlogin";
import { VENDORLOGIN } from "../constants";
import { vendorlogin } from "../api";

export function* handleVendorLoginLoad(action) {
  try {
    const vendorlogindata = yield call(vendorlogin, action.vendorlogin);
    if (vendorlogindata && vendorlogindata.error) throw vendorlogindata.error;
    yield put(setVendorLogin(vendorlogindata));
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* watchVendorLoginLoad() {
  yield takeEvery(VENDORLOGIN.LOAD, handleVendorLoginLoad);
}
