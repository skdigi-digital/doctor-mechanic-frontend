import { all } from "redux-saga/effects";
import Login from "./login";
import Course from "./course";
import Exam from "./exam";
import Employees from "./employees";
import Students from "./students";
import Users from "./users";
import Vendorlogin from "./vendorlogin";
import Dealer from "./dealer"
import Vendors from "./vendorslist";
import Service from "./service";
import Notification from "./notification";
import Orders from "./orders";
import Admin from "./admin";
export default function* rootSaga() {
  yield all([
    Login(),
    Course(),
    Employees(),
    Exam(),
    Students(),
    Users(),
    Admin(),
    Vendorlogin(),
    Vendors(),
    Service(),
    Notification(),
    Orders(),
    Dealer(),
  ]);
}
