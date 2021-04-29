import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import {
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryContainer,
    VictoryTooltip,
    VictoryStack,
    VictoryAxis,
    VictoryTheme,
} from "victory";
import Config from "../config.json";
import { Grid } from "@material-ui/core";
import GPDHeader from "./GPDHeader";
import { TextField } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Container } from "@material-ui/core";

class EnrollmentChart extends Component {
    render() {
        let bars = this.props.victoryObjectArray.map((elem) =>
            elem.map((subElem, index) => (
                <VictoryBar
                    barWidth={10}
                    padding={{ left: 10, right: 10 }}
                    key={index}
                    data={subElem}
                    alignment="start"
                    style={{
                        data: {
                            fill: ({ datum }) => datum.fill,
                        },
                    }}
                />
            ))
        );

        return (
            <>
                <Container>
                    <Grid container xs={12}>
                        <Grid item xs={12}>
                            <VictoryChart height={500} width={800} containerComponent={<VictoryContainer responsive={false} />}>
                                <VictoryGroup
                                    offset={20 / this.props.scaleFactor}
                                    domainPadding={20}
                                    labelComponent={<VictoryTooltip />}
                                >
                                    {bars}
                                </VictoryGroup>
                            </VictoryChart>
                        </Grid>
                    </Grid>
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
        const enrollmentTrendsForTable = this.props.enrollmentTrendsForTable;

        return (
            <>
                <Container>
                    <Grid container xs={12}>
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
                                        {enrollmentTrendsForTable.map((elem, index) => (
                                            <EnrollmentTableRow
                                                course={elem[3]}
                                                semester={elem[0]}
                                                year={elem[1]}
                                                enrollment={elem[2]}
                                                key={index}
                                            />
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

    allCourses = [
        "AMS 500",
        "AMS 501",
        "AMS 502",
        "AMS 503",
        "AMS 504",
        "AMS 505",
        "AMS 507",
        "AMS 510",
        "AMS 511",
        "AMS 512",
        "AMS 513",
        "AMS 514",
        "AMS 515",
        "AMS 516",
        "AMS 517",
        "AMS 518",
        "AMS 519",
    ];

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
                    <Grid item justify="center" xs={12}>
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
                                        {this.allCourses.map((course) => (
                                            <MenuItem key={course} value={course}>
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
                                        <MenuItem key={"Summer"} value={"Summer"}>
                                            {"Summer"}
                                        </MenuItem>
                                        <MenuItem key={"Fall"} value={"Fall"}>
                                            {"Fall"}
                                        </MenuItem>
                                        <MenuItem key={"Winter"} value={"Winter"}>
                                            {"Winter"}
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
            selectedSemester: "",
            selectedCourses: [],
            selectedSemesters: [],
        };
    }

    colors = ["lightsalmon", "indigo", "green", "aqua", "red", "darkslategray", "darkslategray", "fuchsia", "gold", "blue"];

    createVictoryObject = (elem, selectedCourses) => {
        let elemArray = [];
        let x1 = elem[0] + " " + elem[1];
        let y1 = elem[2];
        let label1 = elem[3];
        let fill1 = this.colors[selectedCourses.indexOf(label1)];
        elemArray.push({ x: x1, y: y1, label: label1, fill: fill1 });
        return elemArray;
    };

    createVictoryObjectArray = (enrollmentTrendsForChart, selectedCourses) => {
        let victoryObjectArray = [];
        // enrollmentTrends is an Object, so iterate through its values.
        for (let course of enrollmentTrendsForChart.values()) {
            let currCourseObjs = [];
            for (let semester of course) {
                let semesterArray = this.createVictoryObject(semester, selectedCourses);
                currCourseObjs.push(semesterArray);
            }
            victoryObjectArray.push(currCourseObjs);
        }
        return victoryObjectArray;
    };

    createEnrollmentTrendsForChart = (yearTrends, yearAndSemesterArray, coursesArray) => {
        let enrollmentTrendsForChart = [];
        for (let i = 0; i < yearTrends.length; i++) {
            let elemArray = [];
            for (let j = 0; j < yearAndSemesterArray.length; j++) {
                let semester = yearAndSemesterArray[j][0];
                let year = yearAndSemesterArray[j][1];
                let enrollment = yearTrends[i][year][semester];
                let course = coursesArray[i];
                elemArray.push([semester, year, enrollment, course]);
            }
            enrollmentTrendsForChart.push(elemArray);
        }
        return enrollmentTrendsForChart;
    };

    createEnrollmentTrendsForTable = (yearTrends, yearAndSemesterArray, coursesArray) => {
        let enrollmentTrendsForTable = [];
        for (let i = 0; i < yearTrends.length; i++) {
            for (let j = 0; j < yearAndSemesterArray.length; j++) {
                let semester = yearAndSemesterArray[j][0];
                let year = yearAndSemesterArray[j][1];
                let enrollment = yearTrends[i][year][semester];
                let course = coursesArray[i];
                enrollmentTrendsForTable.push([semester, year, enrollment, course]);
            }
        }
        return enrollmentTrendsForTable;
    };

    handleCourseSubmit = () => {
        // alert(`Course added: ${this.state.course}`);
        let coursesArr;
        if (
            !this.state.selectedCourses.includes(this.state.course) &&
            this.state.selectedCourses.length <= 2 &&
            this.state.course != ""
        ) {
            coursesArr = this.state.selectedCourses.concat(this.state.course);
        } else {
            coursesArr = this.state.selectedCourses;
        }
        this.setState({
            selectedCourses: coursesArr,
        });
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

    handleYearAndSemesterSubmit = () => {
        // alert(`Semester added: ${this.state.semester} ${this.state.year}`);
        let yearAndSemStr = this.state.semester + " " + this.state.year;
        let yearAndSemArr;
        if (
            !this.state.selectedSemesters.includes(yearAndSemStr) &&
            this.state.selectedSemesters.length <= 6 &&
            this.state.year != "" &&
            this.state.semester != ""
        ) {
            yearAndSemArr = this.state.selectedSemesters.concat(yearAndSemStr);
        } else {
            yearAndSemArr = this.state.selectedSemesters;
        }

        this.setState({
            selectedSemesters: yearAndSemArr,
        });
    };

    createNewRangeOfSemesters = (rangeOfSemesters) => {
        let finalArr = [];
        for (let elem of rangeOfSemesters) {
            let arr = elem.split(" ");
            finalArr.push(arr);
        }
        return finalArr;
    };

    render() {
        const yearTrends = [
            {
                2019: { Spring: 55, Summer: 30, Fall: 50, Winter: 25 },
                2020: { Spring: 60, Summer: 25, Fall: 70, Winter: 35 },
                2021: { Winter: 25, Spring: 60 },
            },
            {
                2019: { Spring: 45, Summer: 35, Fall: 55, Winter: 25 },
                2020: { Spring: 60, Summer: 40, Fall: 75, Winter: 40 },
                2021: { Winter: 25, Spring: 60 },
            },
            {
                2019: { Spring: 75, Summer: 25, Fall: 60, Winter: 25 },
                2020: { Spring: 65, Summer: 30, Fall: 60, Winter: 35 },
                2021: { Winter: 25, Spring: 65 },
            },
        ];

        let yearAndSemesterArray = this.state.selectedSemesters.map((sem) => sem.split(" "));

        let coursesArray = this.state.selectedCourses;

        let enrollmentTrendsForTable = this.createEnrollmentTrendsForTable(yearTrends, yearAndSemesterArray, coursesArray);

        const enrollmentTrendsForChart = this.createEnrollmentTrendsForChart(yearTrends, yearAndSemesterArray, coursesArray);

        const victoryObjectArray = this.createVictoryObjectArray(enrollmentTrendsForChart, this.state.selectedCourses);

        return (
            <>
                {/* {console.log(yearAndSemesterArray)} */}
                {/* {console.log(coursesArray)} */}
                {/* {console.log(enrollmentTrendsForTable)} */}
                {/* {console.log(enrollmentTrendsForChart)} */}
                {/* {console.log(victoryObjectArray)} */}
                <Grid container>
                    <Grid item>
                        <Selection
                            course={this.state.course}
                            year={this.state.year}
                            semester={this.state.semester}
                            selectedCourses={this.state.selectedCourses}
                            selectedSemesters={this.state.selectedSemesters}
                            onCourseSubmit={this.handleCourseSubmit}
                            onCourseChange={this.handleCourseChange}
                            onYearChange={this.handleYearChange}
                            onSemesterChange={this.handleSemesterChange}
                            onYearAndSemesterSubmit={this.handleYearAndSemesterSubmit}
                        />
                    </Grid>
                    <Grid item>
                        <EnrollmentChart
                            victoryObjectArray={victoryObjectArray}
                            scaleFactor={this.state.selectedSemesters.length}
                            selectedCourses={this.state.selectedCourses}
                            selectedSemesters={this.state.selectedSemesters}
                        />
                    </Grid>
                    <Grid item>
                        <EnrollmentTable enrollmentTrendsForTable={enrollmentTrendsForTable} />
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default EnrollmentTrends;
