import React from "react";
import { Switch, Route } from "react-router-dom";
import StudentTable from "./StudentTable";
import StudentDetail from "./StudentDetail";
import AddStudent from "./AddStudent";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import GPDPage from "./GPDPage";

import GPDHeader from "./GPDHeader";
import App from "./App";
import EditStudentInfo from "./EditStudentInfo"


const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route path="/studentTable" component={StudentTable} />
            <Route path="/gpdPage" component={GPDPage} />
            <Route path="/studentDetail" component={StudentDetail} />
            <Route path="/addStudent" component={AddStudent} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/editStudent" component={EditStudentInfo} />
        </Switch>
    </main>
);

export default Main;
