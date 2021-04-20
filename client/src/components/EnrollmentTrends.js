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
} from "victory";
import Config from "../config.json";

class EnrollmentChart extends Component {
    render() {
        return (
            <>
                <VictoryChart
                    height={500}
                    width={800}
                    containerComponent={<VictoryContainer responsive={false} />}
                >
                    <VictoryGroup
                        offset={this.props.scaleFactor}
                        labelComponent={<VictoryTooltip />}
                        colorScale={"qualitative"}
                    >
                        {this.props.victoryObjectArray.map((elem) =>
                            elem.map((subElem, index) => (
                                <VictoryBar
                                    barWidth={(1 / this.props.scaleFactor) * 20}
                                    key={index}
                                    data={subElem}
                                />
                            ))
                        )}
                    </VictoryGroup>
                </VictoryChart>
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
        this.handleYearAndSemesterSubmit = this.handleYearAndSemesterSubmit.bind(
            this
        );
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
        let coursesList = this.props.selectedCourses.map((course) => (
            <li key={course}>{course}</li>
        ));
        let semestersList = this.props.selectedSemesters.map((sem) => (
            <li key={sem}>{sem}</li>
        ));

        return (
            <>
                <form onSubmit={this.handleCourseSubmit}>
                    <label>
                        Select Course
                        <select
                            value={course}
                            onChange={this.handleCourseChange}
                        >
                            <option value="cse500">CSE 500</option>
                            <option value="cse501">CSE 501</option>
                            <option value="cse502">CSE 502</option>
                        </select>
                    </label>
                    <button type="submit">Add Course</button>
                </form>
                <form>
                    <label>
                        Select Year
                        <select value={year} onChange={this.handleYearChange}>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                        </select>
                    </label>
                </form>
                <form>
                    <label>
                        Select Semester
                        <select
                            value={semester}
                            onChange={this.handleSemesterChange}
                        >
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                        </select>
                    </label>
                    <br />
                </form>
                <br />
                <button onClick={this.handleYearAndSemesterSubmit}>
                    Add Term to Query
                </button>
                <p>Courses to Query:</p>
                <ul>{coursesList}</ul>
                <p>For these Terms:</p>
                <ul>{semestersList}</ul>
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
        this.handleYearAndSemesterSubmit = this.handleYearAndSemesterSubmit.bind(
            this
        );

        this.state = {
            course: "cse500",
            year: "2019",
            selectedYear: "",
            semester: "Spring",
            selectedSemester: "",
            selectedCourses: [],
            selectedSemesters: [],
        };
    }

    createVictoryObject = (elem) => {
        let elemArray = [];
        let x1 = elem[0] + " " + elem[1];
        let y1 = elem[2];
        let label1 = elem[3];
        elemArray.push({ x: x1, y: y1, label: label1 });
        return elemArray;
    };

    createVictoryObjectArray = (enrollmentTrendsForChart) => {
        let victoryObjectArray = [];
        // enrollmentTrends is an Object, so iterate through its values.
        for (let course of enrollmentTrendsForChart.values()) {
            let currCourseObjs = [];
            for (let semester of course) {
                let semesterArray = this.createVictoryObject(semester);
                currCourseObjs.push(semesterArray);
            }
            victoryObjectArray.push(currCourseObjs);
        }
        return victoryObjectArray;
    };

    createEnrollmentTrendsForChart = (
        yearTrends,
        yearAndSemesterArray,
        coursesArray
    ) => {
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

    createEnrollmentTrendsForTable = (
        yearTrends,
        yearAndSemesterArray,
        coursesArray
    ) => {
        let enrollmentTrendsForTable = [];
        for (let i = 0; i < yearTrends.length; i++) {
            for (let j = 0; j < yearAndSemesterArray.length; j++) {
                let semester = yearAndSemesterArray[j][0];
                let year = yearAndSemesterArray[j][1];
                let enrollment = yearTrends[i][year][semester];
                let course = coursesArray[i];
                enrollmentTrendsForTable.push([
                    semester,
                    year,
                    enrollment,
                    course,
                ]);
            }
        }
        return enrollmentTrendsForTable;
    };

    handleCourseSubmit = () => {
        alert(`Course added: ${this.state.course}`);
        let coursesArr;
        if (!this.state.selectedCourses.includes(this.state.course)) {
            coursesArr = this.state.selectedCourses.concat(this.state.course);
        } else {
            coursesArr = this.state.selectedCourses;
        }
        this.setState(
            {
                selectedCourses: coursesArr,
            },
            () => console.log(this.state.selectedCourses)
        );
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
        alert(`Semester added: ${this.state.semester} ${this.state.year}`);
        let yearAndSemStr = this.state.semester + " " + this.state.year;
        let yearAndSemArr;
        if (!this.state.selectedSemesters.includes(yearAndSemStr)) {
            yearAndSemArr = this.state.selectedSemesters.concat(yearAndSemStr);
        } else {
            yearAndSemArr = this.state.selectedSemesters;
        }

        this.setState(
            {
                selectedSemesters: yearAndSemArr,
            },
            () => console.log(this.state.selectedSemesters)
        );
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

        let yearAndSemesterArray = this.state.selectedSemesters.map((sem) =>
            sem.split(" ")
        );

        let coursesArray = this.state.selectedCourses;

        let enrollmentTrendsForTable = this.createEnrollmentTrendsForTable(
            yearTrends,
            yearAndSemesterArray,
            coursesArray
        );

        const enrollmentTrendsForChart = this.createEnrollmentTrendsForChart(
            yearTrends,
            yearAndSemesterArray,
            coursesArray
        );

        const victoryObjectArray = this.createVictoryObjectArray(
            enrollmentTrendsForChart
        );

        return (
            <>
                {/* {console.log(yearAndSemesterArray)} */}
                {/* {console.log(coursesArray)} */}
                {/* {console.log(enrollmentTrendsForTable)} */}
                {/* {console.log(enrollmentTrendsForChart)} */}
                {/* {console.log(victoryObjectArray)} */}
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
                <EnrollmentTable
                    enrollmentTrendsForTable={enrollmentTrendsForTable}
                />
                <EnrollmentChart
                    victoryObjectArray={victoryObjectArray}
                    scaleFactor={victoryObjectArray.length}
                />
            </>
        );
    }
}

export default EnrollmentTrends;
