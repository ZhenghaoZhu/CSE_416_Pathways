import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class StudentDetail extends Component {
    constructor(props) {
        super(props);
        var curFocusStudent = {};
        if (this.props.focusStudent !== undefined) {
            curFocusStudent = this.props.focusStudent.row;
        }
        this.state = {
            curStudent: curFocusStudent,
        };
    }

    BuildTypography(title, text) {
        return (
            <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="center"
                style={{ fontSize: 22 }}
            >
                <b>{title}</b> - {text}
            </Typography>
        );
    }
    render() {
        console.log(this.props.focusStudent);
        var studentInfo = undefined;
        if (
            this.props.focusStudent !== undefined &&
            this.props.focusStudent.row !== undefined
        ) {
            studentInfo = this.props.focusStudent.row;
        } else {
            studentInfo = {
                firstName: "Benjamin",
                lastName: "Weir",
                id: 0,
                email: "student@stonybrook.edu",
                gpa: 3.5,
                department: "AMS",
                track: "Quantitative Finance",
                reqVersionSem: "None",
                reqVersionYear: "None",
                entrySem: "Fall",
                entryYear: "2019",
                gradSem: "Spring",
                gradYear: "2024",
                coursePlan: "None",
                projectOption: "None",
                facultyAdvisor: "Scott Stoller",
                proficiencyReq: [],
                degreeRequirements: "None", //TODO CHECK
                password: "",
                graduated: false,
                settings: "None",
                comments: "None",
            };
        }

        var expectedGrad = studentInfo.gradSem + " " + studentInfo.gradYear;

        return (
            <Card
                style={{
                    height: 500,
                    marginTop: 50,
                    marginBottom: 13,
                }}
            >
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        align="center"
                        style={{ fontSize: 35, textDecoration: "underline" }}
                    >
                        {studentInfo.firstName + " " + studentInfo.lastName}
                    </Typography>
                    {this.BuildTypography("ID", studentInfo.id)}
                    {this.BuildTypography("Email", studentInfo.email)}
                    {this.BuildTypography("GPA", studentInfo.gpa)}
                    {this.BuildTypography("Department", studentInfo.department)}
                    {this.BuildTypography("Track", studentInfo.track)}
                    {this.BuildTypography(
                        "Requirement Version",
                        studentInfo.reqVersionSem +
                            " " +
                            studentInfo.reqVersionYear
                    )}
                    {this.BuildTypography(
                        "Entry Semester",
                        studentInfo.entrySem
                    )}
                    {this.BuildTypography("Entry Year", studentInfo.entryYear)}
                    {this.BuildTypography("Expected Graduation", expectedGrad)}
                    {this.BuildTypography(
                        "Project Option",
                        studentInfo.projectOption
                    )}
                    {this.BuildTypography(
                        "Faculty Advisor",
                        studentInfo.facultyAdvisor
                    )}
                    {this.BuildTypography(
                        "Degree Requirements",
                        studentInfo.degreeRequirements
                    )}
                    {this.BuildTypography(
                        "Graduated",
                        studentInfo.graduated ? "Yes" : "No"
                    )}
                    {/* {this.BuildTypography("Comments", studentInfo.comments)} */}
                </CardContent>
            </Card>
        );
    }
}

export default StudentDetail;
