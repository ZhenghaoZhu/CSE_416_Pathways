import React, { Component } from "react";
import { DataGrid, filterGridStateSelector } from "@material-ui/data-grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import GPDHeader from "./GPDHeader";

class StudentDetail extends Component {
    constructor(props) {
        super(props);
        var curFocusStudent = {};
        if (this.props.focusStudent != undefined) {
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
                style={{ fontSize: 19 }}
            >
                <b>{title}</b> - {text}
            </Typography>
        );
    }
    render() {
        console.log(this.props.focusStudent);
        var studentInfo = undefined;
        if (
            this.props.focusStudent != undefined &&
            this.props.focusStudent.row != undefined
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
                reqVersion: "2019",
                entrySem: "Fall",
                entryYear: "2019",
                gradSem: "2023",
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

        return (
            <Card
                style={{
                    height: 500,
                    marginTop: 50,
                    marginBottom: 10,
                }}
            >
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        align="center"
                        style={{ fontSize: 30, textDecoration: "underline" }}
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
                        studentInfo.reqVersion
                    )}
                    {this.BuildTypography(
                        "Entry Semester",
                        studentInfo.entrySem
                    )}
                    {this.BuildTypography("Entry Year", studentInfo.entryYear)}
                    {this.BuildTypography(
                        "Graduating Semester",
                        studentInfo.gradSem
                    )}
                    {this.BuildTypography(
                        "Course Plan",
                        studentInfo.coursePlan
                    )}
                    {this.BuildTypography(
                        "Project Option",
                        studentInfo.projectOption
                    )}
                    {this.BuildTypography(
                        "Faculty Advisor",
                        studentInfo.facultyAdvisor
                    )}
                    {this.BuildTypography(
                        "Proficiency Requirements",
                        studentInfo.proficiencyReq
                    )}
                    {this.BuildTypography(
                        "Degree Requirements",
                        studentInfo.degreeRequirements
                    )}
                    {this.BuildTypography("Graduated", studentInfo.graduated)}
                    {this.BuildTypography("Comments", studentInfo.comments)}
                </CardContent>
            </Card>
        );
    }
}

export default StudentDetail;
