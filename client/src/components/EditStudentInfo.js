import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Grid,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@material-ui/core";
import emailjs from "emailjs-com";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GPDHeader from "./GPDHeader";
import Config from "../config.json";
import { Link } from "react-router-dom";
const axios = require("axios").default;

var addedComments = 0;
class EditStudent extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.location.focusStudent.row;
        this.state.commentInput = "";
        this.state.popFlag = false;
        this.state.semesterInput = "";
        this.state.yearInput = "";
        this.state.courseToAdd = "";
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props);
        axios
            .get(Config.URL + "/student/get/" + props.location.focusStudent.row.id)
            .then((student) => {
                this.state = student.data;
            })
            .catch((err) => console.log("Error: ", err));
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
    setCommentInput(e) {
        this.setState({ commentInput: e.target.value });
    }
    addComment() {
        var input = this.state.commentInput;
        if (input !== "") {
            this.setState((prevState) => ({
                comments: [...prevState.comments, input],
            }));
            addedComments += 1;
            this.setState({ commentInput: "" }); // empty out the commentInput
        } else {
            console.log("enter comments");
        }
    }
    deleteComment(index) {
        this.setState((prevState) => ({ comments: prevState.comments.filter((_, commentIdx) => index != commentIdx) }));
        addedComments -= 1;
    }

    // emailForm() {
    //     return (
    //         <form id="form">
    //             <label for="to_name">to_name</label>
    //             <input type="text" name="to_name" id="to_name" value="Wow"></input>
    //             <label for="send_to">send_to</label>
    //             <input type="text" name="send_to" id="send_to" value="zhenghao.zhu@stonybrook.edu"></input>
    //         </form>
    //     );
    // }

    onSubmit(e) {
        if (addedComments > 0) {
            emailjs.sendForm("service_z5t1hrh", "template_710dj0e", "#emailForm", "user_XR4shcXcbLVGILIizXhQ4").then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
        }
        console.log(this.state);
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
    makeCards(course_plan) {
        let courses = [];
        course_plan.map((e) => {
            courses.push(
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {e}
                        </Typography>
                    </CardContent>
                </Card>
            );
        });
        return courses;
    }
    handleEdit() {
        this.setState({ popFlag: true });
    }
    handleClose() {
        // TODO: handle the cancle case.
        this.setState({ popFlag: false, semesterInput: "", yearInput: "", courseToAdd: "" });
    }
    handleAdd() {
        this.setState({ popFlag: true });
    }
    handleEnter() {
        this.setState({ popFlag: false });
        console.log(this.state);
        this.addCourse(this.state.editCourse);
    }
    editCourse(course) {
        for (const [semester, course_plan] of Object.entries(this.state.coursePlan)) {
            if (this.state.semesterInput + " " + this.state.yearInput === semester) {
                // in this semester rn
                console.log(course_plan);
                if (course_plan[0][2] !== "") {
                    //has a grade, can only edit
                    console.log("I have no grade");
                } else {
                    //
                    console.log("i have grade");
                }
            }
        }
    }
    addCourse(course) {
        console.log("Okok");
    }
    setCoursePlanInput(e) {
        this.setState({ coursePlanInput: e.target.value });
        console.log(e.target.value);
    }
    setSemesterInput(e) {
        this.setState({ semesterInput: e.target.value });
    }
    setYearInput(e) {
        this.setState({ yearInput: e.target.value });
    }
    setCourseToAdd(e) {
        this.setState({ courseToAdd: e.target.value });
    }
    render() {
        const courseplanObj = [];
        for (const [semester, course_plan] of Object.entries(this.state.coursePlan)) {
            courseplanObj.push(
                <Accordion style={{ margin: "auto", marginTop: "20px" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>{semester}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>{this.makeCards(course_plan)}</AccordionDetails>
                </Accordion>
            );
        }
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
                <Dialog open={this.state.popFlag} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Enter Following Information</DialogTitle>
                    <DialogContent>
                        <TextField id="semester" label="Semester" fullWidth onChange={(val) => this.setSem(val)} />
                        <TextField id="year" label="Year" fullWidth onChange={(val) => this.setYear(val)} />
                        <TextField id="course_plan" label="Course Plan" fullWidth onChange={(val) => this.setCourseInput(val)} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleEnter()} color="primary">
                            Enter
                        </Button>
                    </DialogActions>
                </Dialog>
                <Grid container>
                    <Grid item sm={6}>
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
                                        value={this.state.id}
                                        onChange={(val) => this.setID(val)}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        style={{
                                            padding: "10px",
                                        }}
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
                                        style={{
                                            padding: "10px",
                                        }}
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
                                        style={{
                                            padding: "10px",
                                        }}
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
                                        style={{
                                            padding: "10px",
                                        }}
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
                                        style={{
                                            padding: "10px",
                                        }}
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
                                        style={{
                                            padding: "10px",
                                        }}
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
                                        style={{ margin: "20px" }}
                                        onClick={(e) => this.onSubmit(e)}
                                    >
                                        <Link
                                            to={{
                                                pathname: "/gpd",
                                                focusStudent: this.state,
                                            }}
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                        >
                                            Save Changes
                                        </Link>
                                    </Button>
                                </Grid>
                            </Grid>
                            <TextField
                                fullWidth
                                id="comments"
                                label="Comments"
                                variant="outlined"
                                value={this.state.commentInput}
                                onChange={(val) => this.setCommentInput(val)}
                            />

                            <Button
                                variant="contained"
                                style={{
                                    color: "#000000",
                                    margin: 10,
                                    padding: 10,
                                }}
                                onClick={() => this.addComment()}
                            >
                                Add Comment
                            </Button>
                        </form>
                    </Grid>

                    <Grid item sm={6}>
                        {courseplanObj}
                        {this.state.comments.map((comment, index) => (
                            <Card key={index} id={index} style={{ marginTop: "30px" }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {comment}
                                    </Typography>
                                    <Button variant="contained" onClick={() => this.deleteComment(index)}>
                                        Delete Comment
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                        <Button
                            variant="contained"
                            onClick={() => this.handleAdd()}
                            style={{
                                color: "#000000",
                                margin: 10,
                                padding: 10,
                            }}
                        >
                            Add course
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => this.handleEdit()}
                            style={{
                                color: "#000000",
                                margin: 10,
                                padding: 10,
                            }}
                        >
                            Edit coursePlan
                        </Button>
                    </Grid>
                    <div style={{ display: "none" }}>
                        <form id="emailForm">
                            <label for="to_name">to_name</label>
                            <input type="text" name="to_name" id="to_name" value={this.state.firstName + " " + this.state.lastName}></input>
                            <label for="send_to">send_to</label>
                            <input type="text" name="send_to" id="send_to" value={this.state.email}></input>
                        </form>
                    </div>
                </Grid>
            </>
        );
    }
}

export default EditStudent;
