import React from "react";
import { Switch, Route } from "react-router-dom";
import StudentTable from "./StudentTable";
import StudentDetail from "./StudentDetail";
import AddStudent from "./AddStudent";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import GPDPage from "./GPDPage";

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route path="/studentTable" component={StudentTable} />
            <Route path="/gpdPage" component={GPDPage} />
            <Route path="/studentDetail" component={StudentDetail} />
            <Route path="/addStudent" component={AddStudent} />
            <Route path="/register" component={RegisterForm} />
        </Switch>
    </main>
);

export default Main;
