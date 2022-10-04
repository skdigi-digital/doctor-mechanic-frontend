import { combineReducers } from "redux";
import LoginReducer from "./login";
import CourseReducer from "./course";
import ExamReducer from "./exam";
import StudentsReducer from "./students";
import EmployeeReducer from "./employees";
import UsersReducer from "./users";
import VendorlistReducer from "./vendors";
import VendorloginReducer from "./vendorlogin";
import ServicelistReducer from "./service";
import NotificationReducer from "./notification";
import OrdersReducer from "./orders";
const rootReducer = combineReducers({
  Login: LoginReducer,
  Users: UsersReducer,
  Course: CourseReducer,
  Exam: ExamReducer,
  Students: StudentsReducer,
  Employees: EmployeeReducer,
  Vendorlogin: VendorloginReducer,
  Vendorlist: VendorlistReducer,
  Servicelist: ServicelistReducer,
  Notification: NotificationReducer,
  Orders: OrdersReducer,
});

export default rootReducer;
