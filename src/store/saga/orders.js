import { put, call, takeEvery } from "redux-saga/effects";

import { setOrders, setError } from "../actions/orders";
import { ORDERS } from "../constants";
import { fetchOrders } from "../api";

export function* handleOrdersLoad(action) {
  try {
    const orders = yield call(fetchOrders, action.orders);
    if (orders && orders.error) throw orders.error;
    yield put(setOrders(orders));
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* watchOrdersLoad() {
  yield takeEvery(ORDERS.LOAD, handleOrdersLoad);
}
