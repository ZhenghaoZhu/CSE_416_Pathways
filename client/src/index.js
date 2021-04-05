import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import StudentTable from "../src/components/StudentTable";
import StudentDetail from "../src/components/StudentDetail";
import LoginForm from "../src/components/LoginForm";
import AddStudent from "../src/components/AddStudent";
import RegisterForm from "../src/components/RegisterForm";
import GPDPage from "../src/components/GPDPage";
import EditStudentInfo from "./components/EditStudentInfo";
import EnrollmentTrends from "./components/EnrollmentTrends";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={GPDPage} />
            <Route path="/studentTable" component={StudentTable} />
            <Route path="/login" component={LoginForm} />
            <Route path="/studentDetail" component={StudentDetail} />
            <Route path="/addStudent" component={AddStudent} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/editStudent" component={EditStudentInfo} />
            <Route path="/enrollmentTrends" component={EnrollmentTrends} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
