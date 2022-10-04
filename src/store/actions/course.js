import { COURSE } from "../constants";

const loadCourse = (course) => ({
  type: COURSE.LOAD,
  course,
});

const setCourse = (course) => ({
  type: COURSE.LOAD_SUCCESS,
  course,
});

const setError = (error) => ({
  type: COURSE.LOAD_FAIL,
  error,
});

export { loadCourse, setCourse, setError };
