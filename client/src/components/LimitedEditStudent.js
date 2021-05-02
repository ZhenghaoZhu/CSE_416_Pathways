import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography, Grid, Button } from "@material-ui/core";
import GPDHeader from "./GPDHeader";
import Config from "../config.json";
import { Link } from "react-router-dom";

import StudentHeader from "./StudentHeader";

const axios = require("axios").default;

class LimitedEditStudent extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = this.props.location.loggedInStudent;
        console.log(this.state);
    }
    setID(e) {
        this.setState({ id: e.target.value });
    }
    setFirst(e) {
        this.setState({ firstName: e.target.value });
    }
    setLast(e) {
        this.setState({ lastName: e.target.value });
    }
    setEmail(e) {
        this.setState({ email: e.target.value });
    }
    setDepartment(e) {
        this.setState({ department: e.target.value });
    }
    setTrack(e) {
        this.setState({ track: e.target.value });
    }
    setEntrySem(e) {
        this.setState({ entrySem: e.target.value });
    }
    setEntryYear(e) {
        this.setState({ entryYear: e.target.value });
    }
    setReqSem(e) {
        this.setState({ reqVersionSem: e.target.value });
    }
    setReqYear(e) {
        this.setState({ reqVersionYear: e.target.value });
    }
    setGradSem(e) {
        this.setState({ gradSem: e.target.value });
    }
    setGradYear(e) {
        this.setState({ gradYear: e.target.value });
    }
    setPassword(e) {
        this.setState({ password: e.target.value });
    }
    onSubmit(e) {
        axios
            .post(Config.URL + "/student/update/" + this.state.id, {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                id: this.state.id,
                email: this.state.email,
                gpa: this.state.gpa,
                department: this.state.department,
                track: this.state.track,
                reqVersionSem: this.state.reqVersionSem,
                reqVersionYear: this.state.reqVersionYear,
                entrySem: this.state.entrySem,
                entryYear: this.state.entryYear,
                gradSem: this.state.gradSem,
                gradYear: this.state.gradYear,
                coursePlan: this.state.coursePlan,
                projectOption: this.state.projectOption,
                facultyAdvisor: this.state.facultyAdvisor,
                proficienyReq: this.state.proficiencyReq,
                degreeRequirements: this.state.degreeRequirements,
                password: this.state.password,
                graduated: this.state.graduated,
                settings: this.state.settings,
                comments: this.state.comments,
            })
            .then((cur) => console.log("Edited student: ", cur))
            .catch((err) => console.log("Error happened :(", err));
    }

    render() {
        return (
            <>
                <div>
                    <StudentHeader />
                </div>
                <div
                    style={{
                        padding: "10px",
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Edit Student Information
                    </Typography>
                </div>
                <div>
                    <form noValidate autoComplete="off">
                        <Grid container>
                            <Grid item xs={3}>
                                <TextField
                                    style={{
                                        padding: "10px",
                                    }}
                                    id="sbu_id"
                                    label="SBU ID"
                                    variant="outlined"
                                    disabled
                                    value={this.state.id}
                                    onChange={(val) => this.setID(val)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="first_name"
                                    label="First Name"
                                    variant="outlined"
                                    required={true}
                                    value={this.state.firstName}
                                    onChange={(val) => this.setFirst(val)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={3}>
                                <TextField
                                    style={{
                                        padding: "10px",
                                    }}
                                    id="last_name"
                                    label="Last Name"
                                    variant="outlined"
                                    required={true}
                                    value={this.state.lastName}
                                    onChange={(val) => this.setLast(val)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    required={true}
                                    value={this.state.email}
                                    onChange={(val) => this.setEmail(val)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={3}>
                                <TextField
                                    style={{
                                        padding: "10px",
                                    }}
                                    id="department"
                                    label="Department"
                                    variant="outlined"
                                    required={true}
                                    value={this.state.department}
                                    onChange={(val) => this.setDepartment(val)}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField
                                    id="track"
                                    label="Track"
                                    variant="outlined"
                                    required={true}
                                    value={this.state.track}
                                    onChange={(val) => this.setTrack(val)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={3}>
                                <TextField
                                    style={{
                                        padding: "10px",
                                    }}
                                    id="entry_semester"
                                    label="Entry Semester"
                                    variant="outlined"
                                    required={true}
                                    value={this.state.entrySem}
                                    onChange={(val) => this.setEntrySem(val)}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField
                                    id="entry_year"
                                    label="Entry Year"
                                    variant="outlined"
                                    required={true}
                                    value={this.state.entryYear}
                                    onChange={(val) => this.setEntryYear(val)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={3}>
                                <TextField
                                    style={{
                                        padding: "10px",
                                    }}
                                    id="requirement_version_semester"
                                    label="Requirement Version Semester"
                                    variant="outlined"
                                    required={true}
                                    value={this.state.reqVersionSem}
                                    onChange={(val) => this.setReqSem(val)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="requirement_version_year"
                                    label="Requirement Version Year"
                                    variant="outlined"
                                    required={true}
                                    value={this.state.reqVersionYear}
                                    onChange={(val) => this.setReqYear(val)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={3}>
                                <TextField
                                    style={{
                                        padding: "10px",
                                    }}
                                    id="graduation_semester"
                                    label="Graduation Semester"
                                    variant="outlined"
                                    required={true}
                                    value={this.state.gradSem}
                                    onChange={(val) => this.setGradSem(val)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="graduation_year"
                                    label="Graduation Year"
                                    variant="outlined"
                                    required={true}
                                    value={this.state.gradYear}
                                    onChange={(val) => this.setGradYear(val)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    style={{ marginTop: "20px" }}
                                    onClick={(e) => this.onSubmit(e)}
                                >
                                    <Link
                                        to={{
                                            pathname: "/student",
                                            loggedInStudent: this.state
                                        }}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        Save Changes
                                    </Link>{" "}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </>
        );
    }
}

export default LimitedEditStudent;
