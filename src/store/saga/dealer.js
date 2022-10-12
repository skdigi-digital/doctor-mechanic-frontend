import { put, call, takeEvery } from "redux-saga/effects";

import { setDealer, setError } from "../actions/dealer";
import { DEALER } from "../constants";
import { fetchDealer } from "../api";
import dealer from "../../containers/dealers";

export function* handleDealerLoad(action) {
  try {
    const dealer = yield call(fetchDealer, action.dealer);
    if (dealer && dealer.error) throw dealer.error;
    yield put(setDealer(dealer));
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* watchDealerLoad() {
  yield takeEvery(DEALER.LOAD, handleDealerLoad);
}
