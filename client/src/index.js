import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import StudentTable from "../src/components/StudentTable";
import StudentDetail from "../src/components/StudentDetail";
import StudentPage from "../src/components/StudentPage";
import LoginForm from "../src/components/LoginForm";
import AddStudent from "../src/components/AddStudent";
import GPDPage from "../src/components/GPDPage";
import EditStudentInfo from "./components/EditStudentInfo";
import EnrollmentTrends from "./components/EnrollmentTrends";
import LimitedEditStudent from "./components/LimitedEditStudent";
import SuggestCourse from "./components/suggestCP";
import SuggestCoursePlanView from "./components/SuggestCoursePlanView";
import DisplaySuggestCP from "./components/DisplaySuggestCP";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route path="/gpd" component={GPDPage} />
            <Route path="/studentDetail" component={StudentDetail} />
            <Route path="/addStudent" component={AddStudent} />
            <Route path="/editStudent" component={EditStudentInfo} />
            <Route path="/limitedEditStudent" component={LimitedEditStudent} />
            <Route path="/student" component={StudentPage} />
            <Route path="/enrollmentTrends" component={EnrollmentTrends} />
            <Route path="/suggestCourse" component={SuggestCourse} />
            <Route path="/suggestCoursePlanView" component={SuggestCoursePlanView} />
            <Route path="/displaySuggestCP" component={DisplaySuggestCP} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
