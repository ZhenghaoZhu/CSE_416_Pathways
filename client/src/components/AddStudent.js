import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography, Grid, Button } from "@material-ui/core";
import GPDHeader from "./GPDHeader";
import Config from "../config.json";

const axios = require("axios").default;
const crypto = require("crypto");
class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "Anthony",
            lastName: "Anthony",
            id: 3122435454,
            email: "gmail@gmail.com",
            gpa: 0.0,
            department: "dd",
            track: "dd",
            reqVersionSem: "Spring",
            reqVersionYear: "2021",
            entrySem: "dd",
            entryYear: "dd",
            gradSem: "Fall",
            gradYear: "2025",
            coursePlan: [],
            projectOption: "None",
            facultyAdvisor: "None",
            proficiencyReq: [],
            degreeRequirements: "None",
            curSem: "Spring",
            curYear: "2021",
            password: "password",
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

    setCurSem(e) {
        this.setState({ curSem: e.target.value });
    }

    setCurYear(e) {
        this.setState({ curYear: e.target.value });
    }

    setPassword(e) {
        this.setState({ password: e.target.value });
    }

    encryptPassword(password, salt) {
        var hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest("hex");
        return value;
    }

    onSubmit = async function (e) {
        var curSalt = crypto.randomBytes(16).toString("base64");
        this.setState({ password: this.encryptPassword(this.state.password, curSalt) });
        var curDegreeReqs = null;
        var curDegreeReqPath = this.state.department + "/" + this.state.reqVersionYear + "/" + this.state.reqVersionSem;
        await axios
            .get(Config.URL + "/degreeReqs/get/" + curDegreeReqPath)
            .then((degreeReq) => {
                curDegreeReqs = degreeReq.data;
            })
            .catch((err) => console.log("Error: ", err));
        if (curDegreeReqs === null || curDegreeReqs === undefined) {
            await axios
                .get(Config.URL + "/degreeReqs/get/" + this.state.department)
                .then((degreeReq) => {
                    curDegreeReqs = degreeReq.data[0];
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        axios
            .post(Config.URL + "/student/add", {
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
                degreeRequirements: curDegreeReqs,
                curSem: this.state.curSem,
                curYear: this.state.curYear,
                password: this.state.password,
                graduated: this.state.graduated,
                settings: this.state.settings,
                comments: this.state.comments,
            })
            .then((cur) => console.log("Added student: ", cur))
            .catch((err) => console.log("Error happened :(", err));
    };

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
                        Add Student
                    </Typography>
                </div>
                <div>
                    <Grid container>
                        <form noValidate autoComplete="off">
                            <Grid item>
                                <TextField
                                    id="sbu_id"
                                    label="SBU ID"
                                    variant="outlined"
                                    autoFocus={true}
                                    required={true}
                                    onChange={(val) => this.setID(val)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    style={{
                                        padding: "10px",
                                    }}
                                    id="first_name"
                                    label="First Name"
                                    variant="outlined"
                                    required={true}
                                    onChange={(val) => this.setFirst(val)}
                                />
                            </Grid>
                            <Grid item>
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
                            <Grid item>
                                <TextField id="email" label="Email" variant="outlined" required={true} onChange={(val) => this.setEmail(val)} />
                            </Grid>

                            <Grid item>
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

                            <Grid item>
                                <TextField id="track" label="Track" variant="outlined" required={true} onChange={(val) => this.setTrack(val)} />
                            </Grid>
                            <Grid item>
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

                            <Grid item>
                                <TextField
                                    style={{
                                        padding: "10px",
                                    }}
                                    id="entry_year"
                                    label="Entry Year"
                                    variant="outlined"
                                    required={true}
                                    onChange={(val) => this.setEntryYear(val)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    style={{
                                        padding: "10px",
                                    }}
                                    id="requirement_version_semester"
                                    label="Requirement Version Semester"
                                    variant="outlined"
                                    required={true}
                                    onChange={(val) => this.setReqSem(val)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    style={{
                                        padding: "10px",
                                    }}
                                    id="requirement_version_year"
                                    label="Requirement Version Year"
                                    variant="outlined"
                                    required={true}
                                    onChange={(val) => this.setReqYear(val)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    style={{
                                        padding: "5px",
                                    }}
                                    id="graduation_semester"
                                    label="Graduation Semester"
                                    variant="outlined"
                                    required={true}
                                    onChange={(val) => this.setGradSem(val)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    style={{
                                        padding: "10px",
                                    }}
                                    id="graduation_year"
                                    label="Graduation Year"
                                    variant="outlined"
                                    required={true}
                                    onChange={(val) => this.setGradYear(val)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    style={{
                                        padding: "10px",
                                    }}
                                    id="cur_semester"
                                    label="Current Semester"
                                    variant="outlined"
                                    required={true}
                                    onChange={(val) => this.setCurSem(val)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    style={{
                                        padding: "10px",
                                    }}
                                    id="cur_year"
                                    label="Current Year"
                                    variant="outlined"
                                    required={true}
                                    onChange={(val) => this.setCurYear(val)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    required={true}
                                    onChange={(val) => this.setPassword(val)}
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={(e) => this.onSubmit(e)}>
                                    Add Student
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                </div>
            </>
        );
    }
}

export default AddStudent;
