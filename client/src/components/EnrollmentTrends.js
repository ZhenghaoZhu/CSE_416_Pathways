import React, { Component } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import { VictoryBar, VictoryChart, VictoryGroup, VictoryTooltip } from "victory";
import Config from "../config.json";
import { Grid } from "@material-ui/core";
import GPDHeader from "./GPDHeader";
import { TextField } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Container } from "@material-ui/core";

class EnrollmentChart extends Component {
    render() {
        let bars = this.props.victoryObjectArray.map((elem, index) => (
            <VictoryBar
                barWidth={10}
                padding={{ left: 10, right: 10 }}
                key={index}
                data={elem}
                alignment="start"
                style={{
                    data: {
                        fill: ({ datum }) => datum.fill,
                    },
                }}
            />
        ));

        return (
            <>
                <Container>
                    <VictoryChart height={500} width={800}>
                        <VictoryGroup offset={70 / this.props.scaleFactor} domainPadding={20} labelComponent={<VictoryTooltip />}>
                            {bars}
                        </VictoryGroup>
                    </VictoryChart>
                </Container>
            </>
        );
    }
}

class EnrollmentTableRow extends Component {
    render() {
        return (
            <>
                <TableRow>
                    <TableCell>{this.props.course}</TableCell>
                    <TableCell>{this.props.semester}</TableCell>
                    <TableCell>{this.props.year}</TableCell>
                    <TableCell>{this.props.enrollment}</TableCell>
                </TableRow>
            </>
        );
    }
}

class EnrollmentTable extends Component {
    render() {
        return (
            <>
                <Container>
                    <Grid container>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Course Name</TableCell>
                                            <TableCell align="left">Year</TableCell>
                                            <TableCell align="left">Semester</TableCell>
                                            <TableCell align="left">Enrollment</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.yearTrendsArray.map((elem, index) => (
                                            <EnrollmentTableRow course={elem[2]} semester={elem[0]} year={elem[1]} enrollment={elem[3]} key={index} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }
}

class Selection extends Component {
    constructor(props) {
        super(props);

        this.handleCourseSubmit = this.handleCourseSubmit.bind(this);
        this.handleCourseChange = this.handleCourseChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleSemesterChange = this.handleSemesterChange.bind(this);
        this.handleYearAndSemesterSubmit = this.handleYearAndSemesterSubmit.bind(this);
    }

    handleCourseSubmit = (e) => {
        this.props.onCourseSubmit();
        e.preventDefault();
    };

    handleCourseChange = (e) => {
        this.props.onCourseChange(e.target.value);
    };

    handleYearChange = (e) => {
        this.props.onYearChange(e.target.value);
    };

    handleSemesterChange = (e) => {
        this.props.onSemesterChange(e.target.value);
    };

    handleYearAndSemesterSubmit = (e) => {
        this.props.onYearAndSemesterSubmit();
        e.preventDefault();
    };

    render() {
        const course = this.props.course;
        const year = this.props.year;
        const semester = this.props.semester;
        let coursesList = this.props.selectedCourses.map((course) => <li key={course}>{course}</li>);
        let semestersList = this.props.selectedSemesters.map((sem) => <li key={sem}>{sem}</li>);

        return (
            <>
                <Grid container>
                    <Grid item xs={12}>
                        <GPDHeader />
                    </Grid>
                </Grid>
                <Container>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h6">Add up to 3 Courses</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h6">Add up to 7 Terms</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <form>
                                <div>
                                    <TextField
                                        id="select_course"
                                        value={course}
                                        select
                                        onChange={this.handleCourseChange}
                                        label="Select Course"
                                        helperText="Please select a Course"
                                    >
                                        {this.props.allCourses.map((course, index) => (
                                            <MenuItem key={index} value={course}>
                                                {course}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                                <Button variant="contained" color="secondary" onClick={this.handleCourseSubmit}>
                                    Add Course
                                </Button>
                            </form>
                        </Grid>

                        <Grid item xs={6}>
                            <form>
                                <div>
                                    <TextField
                                        id="select_year"
                                        value={year}
                                        select
                                        onChange={this.handleYearChange}
                                        label="Select Year"
                                        helperText="Please select a Year"
                                    >
                                        <MenuItem key={"2018"} value={"2018"}>
                                            {"2018"}
                                        </MenuItem>
                                        <MenuItem key={"2019"} value={"2019"}>
                                            {"2019"}
                                        </MenuItem>
                                        <MenuItem key={"2020"} value={"2020"}>
                                            {"2020"}
                                        </MenuItem>
                                        <MenuItem key={"2021"} value={"2021"}>
                                            {"2021"}
                                        </MenuItem>
                                        <MenuItem key={"2022"} value={"2022"}>
                                            {"2022"}
                                        </MenuItem>
                                    </TextField>
                                </div>
                            </form>
                            <br />
                            <form>
                                <div>
                                    <TextField
                                        id="select_semester"
                                        value={semester}
                                        select
                                        onChange={this.handleSemesterChange}
                                        label="Select Semester"
                                        helperText="Please select a Semester"
                                    >
                                        <MenuItem key={"Spring"} value={"Spring"}>
                                            {"Spring"}
                                        </MenuItem>
                                        <MenuItem key={"SummerI"} value={"SummerI"}>
                                            {"SummerI"}
                                        </MenuItem>
                                        <MenuItem key={"SummerII"} value={"SummerII"}>
                                            {"SummerII"}
                                        </MenuItem>
                                        <MenuItem key={"Fall"} value={"Fall"}>
                                            {"Fall"}
                                        </MenuItem>
                                        <MenuItem key={"WinterI"} value={"WinterI"}>
                                            {"WinterI"}
                                        </MenuItem>
                                        <MenuItem key={"WinterII"} value={"WinterII"}>
                                            {"WinterII"}
                                        </MenuItem>
                                    </TextField>
                                </div>
                            </form>
                            <br />
                            <Button variant="contained" color="secondary" onClick={this.handleYearAndSemesterSubmit}>
                                Add Term to Query
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <br />
                            <Typography variant="h6">Courses to Query:</Typography>
                            <ul>{coursesList}</ul>
                        </Grid>
                        <Grid item xs={6}>
                            <br />
                            <Typography variant="h6">For these Terms:</Typography>
                            <ul>{semestersList}</ul>
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }
}

class EnrollmentTrends extends Component {
    constructor(props) {
        super(props);

        this.handleCourseSubmit = this.handleCourseSubmit.bind(this);
        this.handleCourseChange = this.handleCourseChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleSemesterChange = this.handleSemesterChange.bind(this);
        this.handleYearAndSemesterSubmit = this.handleYearAndSemesterSubmit.bind(this);

        this.state = {
            course: "",
            year: "",
            selectedYear: "",
            semester: "",
            selectedCourses: [],
            selectedSemesters: [],
            yearTrendsArray: [],
            allCourses: [],
        };
    }

    colors = ["lightsalmon", "indigo", "green", "aqua", "red", "darkslategray", "darkslategray", "fuchsia", "gold", "blue"];

    componentDidMount() {
        axios
            .get(Config.URL + "/courses/")
            .then((response) => {
                let courseData = response.data;
                let allCourseIds = courseData.map((data) => data.id);
                var uniqueCoursIds = allCourseIds.reduce(function (a, b) {
                    if (a.indexOf(b) < 0) a.push(b);
                    return a;
                }, []);
                this.setState({ allCourses: uniqueCoursIds });
            })
            .catch((error) => console.log(error));
    }

    createVictoryObject = (yearTrends, selectedCourses) => {
        let x1 = yearTrends[1] + " " + yearTrends[0];
        let y1 = yearTrends[3];
        let label1 = yearTrends[2];
        let fill1 = this.colors[selectedCourses.indexOf(label1)];
        return { x: x1, y: y1, label: label1, fill: fill1 };
    };

    createVictoryObjectArray = (yearTrendsArray, selectedCourses) => {
        let victoryObjectArray = [];
        for (let course of selectedCourses) {
            console.log(course);
            let yearTrendsForCourse = [];
            for (let yearTrends of yearTrendsArray) {
                if (yearTrends[2] === course) {
                    let victoryObj = this.createVictoryObject(yearTrends, selectedCourses);
                    yearTrendsForCourse = yearTrendsForCourse.concat(victoryObj);
                }
            }
            victoryObjectArray = victoryObjectArray.concat([yearTrendsForCourse]);
        }
        console.log(victoryObjectArray);
        return victoryObjectArray;
    };

    handleCourseSubmit = () => {
        if (!this.state.selectedCourses.includes(this.state.course) && this.state.selectedCourses.length <= 2 && this.state.course != "") {
            this.setState((prevState) => ({
                selectedCourses: [...prevState.selectedCourses, this.state.course],
            }));
        }
    };

    handleYearAndSemesterSubmit = () => {
        let yearAndSemStr = this.state.semester + " " + this.state.year;
        if (
            !this.state.selectedSemesters.includes(yearAndSemStr) &&
            this.state.selectedSemesters.length <= 6 &&
            this.state.year != "" &&
            this.state.semester != ""
        ) {
            for (let i = 0; i < this.state.selectedCourses.length; i++) {
                axios
                    .get(
                        Config.URL +
                            "/courses/get/course/" +
                            this.state.selectedCourses[i].split(" ").join("") +
                            "/" +
                            this.state.semester +
                            "/" +
                            this.state.year
                    )
                    .then((response) => {
                        console.log(response.data);
                        let courseYearTrends = response.data[0].yearTrends;

                        console.log(courseYearTrends);
                        let courseEnrollment = courseYearTrends.reduce((a, b) => a + b, 0);
                        console.log(courseEnrollment);

                        this.setState((prevState) => ({
                            yearTrendsArray: [
                                ...prevState.yearTrendsArray,
                                [this.state.year, this.state.semester, this.state.selectedCourses[i], courseEnrollment],
                            ],
                        }));
                    })
                    .catch((err) => console.log(err));
            }
            this.setState((prevState) => ({
                selectedSemesters: [...prevState.selectedSemesters, yearAndSemStr],
            }));
        }
    };

    handleCourseChange = (value) => {
        this.setState({
            course: value,
        });
    };

    handleYearChange = (value) => {
        this.setState({
            year: value,
        });
    };

    handleSemesterChange = (value) => {
        this.setState({
            semester: value,
        });
    };

    render() {
        const victoryObjectArray = this.createVictoryObjectArray(this.state.yearTrendsArray, this.state.selectedCourses);

        return (
            <>
                <Grid container>
                    <Grid item xs={12}>
                        <Selection
                            course={this.state.course}
                            year={this.state.year}
                            semester={this.state.semester}
                            selectedCourses={this.state.selectedCourses}
                            selectedSemesters={this.state.selectedSemesters}
                            allCourses={this.state.allCourses}
                            onCourseSubmit={this.handleCourseSubmit}
                            onCourseChange={this.handleCourseChange}
                            onYearChange={this.handleYearChange}
                            onSemesterChange={this.handleSemesterChange}
                            onYearAndSemesterSubmit={this.handleYearAndSemesterSubmit}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <EnrollmentChart victoryObjectArray={victoryObjectArray} scaleFactor={this.state.selectedSemesters.length} />
                    </Grid>
                    <Grid item xs={12}>
                        <EnrollmentTable yearTrendsArray={this.state.yearTrendsArray} />
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default EnrollmentTrends;
