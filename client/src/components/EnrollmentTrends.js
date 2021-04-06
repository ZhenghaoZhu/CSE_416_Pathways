import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
// run 'npm install victory' in client directory.

class EnrollmentTrends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yearTrends: [
                ["Spring 2019", 50],
                ["Fall 2019", 60],
                ["Spring 2020", 55],
                ["Fall 2020", 65],
                ["Spring 2021", 60],
            ],
        };
    }

    BuildTableRow(semester, enrollment) {
        return (
            <TableRow>
                <TableCell>{semester}</TableCell>
                <TableCell>{enrollment}</TableCell>
            </TableRow>
        );
    }

    // Converts array to object (Object format needed for Victory Chart)
    // From...
    //     ["Spring 2019", 50]
    // To...
    //   { semester: 'Spring 2019', enrollment: 50 }
    ConvertToObject(arr) {
        return { semester: arr[0], enrollment: arr[1] };
    }

    render() {
        let yearTrendsObj = this.state.yearTrends.map((elem) => {
            return this.ConvertToObject(elem);
        });

        return (
            <>
                <Typography variant="h2" align="center" gutterBottom>
                    Enrollment Trends
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Semester</TableCell>
                                <TableCell align="left">Enrollment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.yearTrends.map((elem) =>
                                this.BuildTableRow(elem[0], elem[1])
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <VictoryChart domainPadding={20}>
                    <VictoryBar
                        data={yearTrendsObj}
                        x="semester"
                        y="enrollment"
                    />
                </VictoryChart>
            </>
        );
    }
}

export default EnrollmentTrends;
