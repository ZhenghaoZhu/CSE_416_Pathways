import React, { Component } from "react";
import { Grid, MenuItem, FormControl, Button, Select, InputLabel, TextField, Typography, Input } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import GPDHeader from "./GPDHeader";
import * as scpFunc from "./SuggestCoursePlanFunctions";
import Config from "../config.json";

const axios = require("axios").default;
const maxClassesList = [...Array(10).keys()];
const timeConstraintsList = [
    "MWF 08:00AM-08:53AM",
    "MWF 09:00AM-09:53AM",
    "MWF 10:00AM-10:53AM",
    "MWF 11:00AM-11:53AM",
    "MWF 12:00PM-12:53PM",
    "MWF 02:30PM-03:23PM",
    "MWF 03:30PM-04:23PM",
    "MW 08:30AM-9:50AM",
    "MW 02:30PM-03:50PM",
    "MW 04:00PM-05:20PM",
    "MW 05:30PM-06:50PM",
    "MW 07:00PM-08:20PM",
    "MW 08:30PM-09:50PM",
    "MF 01:00PM-02:20PM",
    "TUTH 08:30AM-9:50AM",
    "TUTH 10:00AM-11:20AM",
    "TUTH 11:30AM-12:50PM",
    "TUTH 01:00PM-02:20PM",
    "TUTH 02:30PM-03:50PM",
    "TUTH 04:00PM-05:20PM",
    "TUTH 05:30PM-06:50PM",
    "TUTH 07:00PM-08:20PM",
    "TUTH 08:30PM-09:50PM",
];
export default class SuggestCoursePlanView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curGPD: this.props.curGPD,
            focusStudent: this.props.focusStudent,
            allCourses: [],
            curMaxCourses: 4,
            curTimeConstraints: [],
            curPreferredCourses: [],
            curAvoidedCourses: [],
        };
    }

    componentDidMount() {
        this.getAllCourses();
    }

    static getDerivedStateFromProps(props, state) {
        var realProps = props.location;
        if (realProps !== undefined && realProps.focusStudent !== undefined) {
            return { curGPD: realProps.curGPD, focusStudent: realProps.focusStudent.row };
        }
    }

    getAllCourses = async function () {
        var coursesAdded = new Map();
        await axios
            .get(Config.URL + "/courses")
            .then((response) => {
                var coursesArr = [];
                var curCourse = undefined;
                var shortName = "";
                var curName = "";
                response.data.forEach((course) => {
                    shortName = course["department"] + " " + course["courseNum"];
                    curName = shortName + " " + course["courseName"];
                    curCourse = { title: curName };
                    if (!coursesAdded.has(shortName)) {
                        coursesArr.push(curCourse);
                        coursesAdded.set(shortName, 1);
                    }
                });
                this.setState({ allCourses: coursesArr });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleMaxCourses = (e) => {
        this.setState({ curMaxCourses: e.target.value });
    };

    handleTimeChange = (e) => {
        this.setState({ curTimeConstraints: e.target.value });
    };

    handlePreferredChange = (e) => {
        var newPreferredCourseArr = [];
        var curCourseSplit = [];
        var curCourseID = "";
        e.forEach((curCourse) => {
            curCourseSplit = curCourse.title.split(" ");
            curCourseID = curCourseSplit[0] + curCourseSplit[1];
            newPreferredCourseArr.push(curCourseID);
        });
        this.setState({ curPreferredCourses: newPreferredCourseArr });
    };

    handleAvoidedChange = (e) => {
        var newAvoidedCourseArr = [];
        var curCourseSplit = [];
        var curCourseID = "";
        e.forEach((curCourse) => {
            curCourseSplit = curCourse.title.split(" ");
            curCourseID = curCourseSplit[0] + curCourseSplit[1];
            newAvoidedCourseArr.push(curCourseID);
        });
        this.setState({ curAvoidedCourses: newAvoidedCourseArr });
    };

    createCoursePlanWithSCP = () => {
        console.log(this.state);
        scpFunc.createAllSemesters(
            this.state.focusStudent,
            this.state.curPreferredCourses,
            this.state.curAvoidedCourses,
            this.state.curTimeConstraints,
            this.state.curMaxCourses
        );
    };

    render() {
        return (
            <>
                <GPDHeader curGPD={this.state.curGPD} />
                <Grid container spacing={1} direction="column" justify="center" style={{ width: "95%" }}>
                    <Grid item xs={12} style={{ marginTop: "13%", marginLeft: "22%" }}>
                        <Typography style={{ marginBottom: "20px", marginLeft: "19%", fontSize: "30px", fontWeight: "bold" }}>
                            Input Constraints to Create Course Plan(s)
                        </Typography>
                        <FormControl variant="outlined" style={{ width: "36%", marginRight: "28px" }}>
                            <InputLabel>Courses Per Semester</InputLabel>
                            <Select label="Courses Per Semester" onChange={this.handleMaxCourses}>
                                {maxClassesList.map((maxClasses) => (
                                    <MenuItem value={maxClasses + 1}>{maxClasses + 1}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" style={{ width: "36%", marginRight: "28px" }}>
                            <InputLabel>Time You Don't Want Classes In</InputLabel>
                            <Select
                                multiple
                                value={this.state.curTimeConstraints}
                                label="Time You Don't Want Classes In"
                                onChange={this.handleTimeChange}
                            >
                                {timeConstraintsList.map((timeConstraints) => (
                                    <MenuItem value={timeConstraints}>{timeConstraints}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Autocomplete
                            multiple
                            style={{ marginTop: "20px", width: "74%" }}
                            limitTags={4}
                            id="multiple-limit-tags"
                            options={this.state.allCourses}
                            getOptionLabel={(option) => option.title}
                            onChange={(event, newValue) => {
                                this.handlePreferredChange(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Preferred Courses" placeholder="Preferred Courses" />
                            )}
                        />
                        <Autocomplete
                            multiple
                            style={{ marginTop: "20px", width: "74%" }}
                            limitTags={4}
                            id="multiple-limit-tags"
                            options={this.state.allCourses}
                            getOptionLabel={(option) => option.title}
                            onChange={(event, newValue) => {
                                this.handleAvoidedChange(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Avoided Courses" placeholder="Avoided Courses" />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} style={{ marginLeft: "35%" }}>
                        <Button
                            type="button"
                            variant="contained"
                            style={{ fontSize: "20px", marginRight: "20px", width: "50%" }}
                            onClick={this.createCoursePlanWithSCP}
                        >
                            Suggest Course Plan Mode
                        </Button>
                        <br></br>
                        <Button type="button" variant="contained" color="primary" style={{ fontSize: "20px", marginTop: "15px", width: "50%" }}>
                            Smart Suggestion Mode
                        </Button>
                    </Grid>
                </Grid>
            </>
        );
    }
}
