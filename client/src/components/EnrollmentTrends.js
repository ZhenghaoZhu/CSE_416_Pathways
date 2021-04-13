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
    VictoryStack,
    VictoryTooltip,
} from "victory";

class EnrollmentTrends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCourses: ["CSE 526", "CSE 537", "CSE 548"],
            selectedRangeOfSemesters: [
                [2019, "Spring"],
                [2019, "Fall"],
                [2020, "Spring"],
                [2020, "Fall"],
                [2021, "Spring"],
            ],
            yearTrends: [
                {
                    2019: { Spring: 55, Fall: 50 },
                    2020: { Spring: 60, Fall: 70 },
                    2021: { Spring: 60 },
                },
                {
                    2019: { Spring: 40, Fall: 45 },
                    2020: { Spring: 30, Fall: 40 },
                    2021: { Spring: 50 },
                },
                {
                    2019: { Spring: 75, Fall: 70 },
                    2020: { Spring: 80, Fall: 85 },
                    2021: { Spring: 80 },
                },
            ],
        };
    }

    BuildTableRow(courseName, semester, enrollment) {
        return (
            <TableRow>
                <TableCell>{courseName}</TableCell>
                <TableCell>{semester}</TableCell>
                <TableCell>{enrollment}</TableCell>
            </TableRow>
        );
    }

    BuildVictoryChart(victoryObjectsArray) {
        return victoryObjectsArray.map((elem) => {
            return elem.map((data, index) => {
                return <VictoryBar key={index} data={data} />;
            });
        });
    }

    // Helper function, BuildVictoryObject(...), returns a Victory Objects.
    // A Victory Object has the following structure:
    //     var cse_548_data = [
    //   [
    //     { x: "Spring 2020", y: Math.random() * 60, label: "CSE 548" },
    //     { x: "Fall 2020", y: Math.random() * 60, label: "CSE 548" },
    //     { x: "Spring 2021", y: Math.random() * 60, label: "CSE 548" }
    //   ]
    // ];
    BuildVictoryObject(enrollmentTrendsArray) {
        let outsideCourseInfoArray = [];
        let insideCourseInfoArray = [];
        for (let i = 0; i < enrollmentTrendsArray.length; i++) {
            let x1 =
                enrollmentTrendsArray[i][0] + " " + enrollmentTrendsArray[i][1];
            let y1 = enrollmentTrendsArray[i][2];
            let label1 = enrollmentTrendsArray[i][3];
            insideCourseInfoArray.push({ x: x1, y: y1, label: label1 });
        }
        outsideCourseInfoArray.push(insideCourseInfoArray);
        return outsideCourseInfoArray;
    }

    // BuildVictoryObjectArray takes as input enrollmentTrendsArray and an empty array, and returns an array of Victory Objects.
    BuildVictoryObjectArray(enrollmentTrendsArray, startArray) {
        for (let elem of enrollmentTrendsArray) {
            let elemArray = this.BuildVictoryObject(elem);
            startArray.push(elemArray);
        }
        return startArray;
    }

    /*
    CreateEnrollmentTrendsArray(...) returns an array of arrays.
    Each array represents one specified course's semester, year, enrollment, and courseName.
    Each array has the following has the following structure:
        [
            [ 'Spring', 2019, 55, 'CSE 526' ],
            [ 'Fall', 2019, 50, 'CSE 526' ],
            [ 'Spring', 2020, 60, 'CSE 526' ],
            [ 'Fall', 2020, 70, 'CSE 526' ],
            [ 'Spring', 2021, 60, 'CSE 526' ]
        ]
    */
    CreateEnrollmentTrendsArray(
        yearTrends,
        selectedCourses,
        selectedRangeOfSemesters
    ) {
        let enrollmentTrendsArray = [];
        for (let i = 0; i < yearTrends.length; i++) {
            let array = [];
            for (let j = 0; j < selectedRangeOfSemesters.length; j++) {
                let year = selectedRangeOfSemesters[j][0];
                let term = selectedRangeOfSemesters[j][1];
                let enrollment = yearTrends[i][year][term];
                let courseName = selectedCourses[i];
                array.push([term, year, enrollment, courseName]); // [ 'Spring', 2019, 55, 'CSE 526' ]
            }
            enrollmentTrendsArray.push(array); // [ [ 'Spring', 2019, 55, 'CSE 526' ],  [ 'Fall', 2019, 50, 'CSE 526' ] ]
        }
        return enrollmentTrendsArray;
    }

    render() {
        let enrollmentTrendsArray = this.CreateEnrollmentTrendsArray(
            this.state.yearTrends,
            this.state.selectedCourses,
            this.state.selectedRangeOfSemesters
        );

        let victoryObjectArray = this.BuildVictoryObjectArray(
            enrollmentTrendsArray,
            []
        );

        console.log(victoryObjectArray);

        return (
            <>
                <Typography variant="h2" align="center" gutterBottom>
                    Enrollment Trends
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Course Name</TableCell>
                                <TableCell align="left">Semester</TableCell>
                                <TableCell align="left">Enrollment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {enrollmentTrendsArray.map((elem) => {
                                return elem.map((x) => {
                                    return this.BuildTableRow(
                                        x[3],
                                        x[0] + " " + x[1],
                                        x[2]
                                    );
                                });
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <VictoryChart>
                    <VictoryGroup
                        offset={20}
                        labelComponent={<VictoryTooltip />}
                        colorScale={"qualitative"}
                    >
                        {this.BuildVictoryChart(victoryObjectArray)}
                    </VictoryGroup>
                </VictoryChart>
            </>
        );
    }
}

export default EnrollmentTrends;
