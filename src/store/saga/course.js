import { put, call, takeEvery } from "redux-saga/effects";

import { setCourse, setError } from "../actions/course";
import { COURSE } from "../constants";
import { fetchCourse } from "../api";

export function* handleCourseLoad(action) {
  try {
    const course = yield call(fetchCourse, action.course);
    if (course && course.error) throw course.error;
    yield put(setCourse(course));
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* watchCourseLoad() {
  yield takeEvery(COURSE.LOAD, handleCourseLoad);
}
