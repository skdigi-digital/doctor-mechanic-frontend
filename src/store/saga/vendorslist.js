import { put, call, takeEvery } from "redux-saga/effects";

import { setVendors, setError } from "../actions/vendorlist";
import { VENDORS } from "../constants";
import { fetchVendors } from "../api";

export function* handleUsersLoad(action) {
  try {
    const vendors = yield call(fetchVendors, action.vendors);
    if (vendors && vendors.error) throw vendors.error;
    yield put(setVendors(vendors));
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* watchUsersLoad() {
  yield takeEvery(VENDORS.LOAD, handleUsersLoad);
}
