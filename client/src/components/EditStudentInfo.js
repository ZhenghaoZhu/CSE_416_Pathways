import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography, Grid, Button } from "@material-ui/core";
import GPDHeader from "./GPDHeader";
const axios = require("axios").default;

class EditStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "Anthony",
            lastName: "Anthony",
            id: 3122,
            email: "gmail@gmail.com",
            gpa: 3,
            department: "dd",
            track: "dd",
            reqVersion: "dd",
            entrySem: "dd",
            entryYear: "dd",
            gradSem: "dd",
            coursePlan: "plan",
            projectOption: "option",
            facultyAdvisor: "advisor",
            proficiencyReq: [],
            degreeRequirements: "reqs",
            password: "dd",
            graduated: false,
            settings: "settings",
            comments: [],
        };
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
    // setReqSem(e){
    //   this.stateHolder["reqSem"] = e.target.value;
    // }
    // setReqYear(e){
    //   this.stateHolder["reqYear"] = e.target.value;
    // }
    setGradSem(e) {
        this.setState({ gradSem: e.target.value });
        console.log(this.state.gradSem);
    }
    setGradYear(e) {
        console.log(this.state.gradYear);
        this.setState({ gradYear: e.target.value });
        console.log(this.state.gradYear);
    }
    setPassword(e) {
        this.setState({ password: e.target.value });
        console.log(this.state.password);
    }

    onSubmit(e) {
        axios
            .post("https://sbu-pathways.herokuapp.com/student/add", {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                id: this.state.id,
                email: this.state.email,
                gpa: this.state.gpa,
                department: this.state.department,
                track: this.state.track,
                reqVersion: this.state.reqVersion,
                entrySem: this.state.entrySem,
                entryYear: this.state.entryYear,
                gradSem: this.state.gradSem,
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
            .then((response) => {
                console.log("Reply: ", response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <>
                <div>
                    <GPDHeader />
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
                                    autoFocus={true}
                                    required={true}
                                    onChange={(val) => this.setID(val)}
                                />
                            </Grid>
                            <Grid item xs xs={3}>
                                <TextField
                                    id="first_name"
                                    label="First Name"
                                    variant="outlined"
                                    required={true}
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
                                    onChange={(val) => this.setLast(val)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    required={true}
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
                                    onChange={(val) => this.setDepartment(val)}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField
                                    id="track"
                                    label="Track"
                                    variant="outlined"
                                    required={true}
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
                                    onChange={(val) => this.setEntrySem(val)}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField
                                    id="entry_year"
                                    label="Entry Year"
                                    variant="outlined"
                                    required={true}
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
                                    // onChange={(val) => this.setReqSem(val)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="requirement_version_year"
                                    label="Requirement Version Year"
                                    variant="outlined"
                                    required={true}
                                    // onChange={(val) => this.setReqYear(val)}
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
                                    onChange={(val) => this.setGradSem(val)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="graduation_year"
                                    label="Graduation Year"
                                    variant="outlined"
                                    required={true}
                                    onChange={(val) => this.setGradYear(val)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={3}>
                                <TextField
                                    style={{
                                        padding: "10px",
                                    }}
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    required={true}
                                    onChange={(val) => this.setPassword(val)}
                                />
                            </Grid>
                            <Grid item xs>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    style={{ marginTop: "20px" }}
                                    onClick={(e) => this.onSubmit(e)}
                                >
                                    Save Changes
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </>
        );
    }
}

export default EditStudent;
