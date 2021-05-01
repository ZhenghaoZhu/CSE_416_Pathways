import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Config from "../config.json";

class StudentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curStudent: {},
        };
        console.log(this.props);
        console.log(this.state);
    }

    static getDerivedStateFromProps(props, state) {
        var curFocusStudent = {};
        if (props !== undefined && props.focusStudent !== undefined) {
            curFocusStudent = props.focusStudent.row;
        }
        return { curStudent: curFocusStudent };
    }

    BuildTypography(title, text) {
        return (
            <Typography variant="body2" color="textSecondary" component="p" align="center" style={{ fontSize: 23 }}>
                <b>{title}</b> - {text}
            </Typography>
        );
    }
    render() {
        var studentInfo = undefined;
        if (Object.keys(this.state.curStudent).length !== 0) {
            studentInfo = this.props.focusStudent.row;
        } else {
            studentInfo = {
                firstName: "Select a",
                lastName: "Student",
                id: 0,
                email: "",
                gpa: 0,
                department: "",
                track: "",
                reqVersionSem: "",
                reqVersionYear: "",
                entrySem: "",
                entryYear: "",
                gradSem: "",
                gradYear: "",
                coursePlan: "",
                projectOption: "",
                facultyAdvisor: "",
                proficiencyReq: [],
                degreeRequirements: "", //TODO CHECK
                password: "",
                graduated: false,
                settings: "",
                comments: "",
            };
        }
        // console.log(this.props.focusStudent.row);
        // console.log(studentInfo);
        // var expectedGrad = studentInfo.gradSem + " " + studentInfo.gradYear;
        return (
            <Card
                style={{
                    height: 500,
                    marginTop: 50,
                    marginBottom: 13,
                }}
            >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" align="center" style={{ fontSize: 35, textDecoration: "underline" }}>
                        {studentInfo.firstName + " " + studentInfo.lastName}
                    </Typography>
                    {this.BuildTypography("ID", studentInfo.id)}
                    {this.BuildTypography("Email", studentInfo.email)}
                    {this.BuildTypography("GPA", studentInfo.gpa)}
                    {this.BuildTypography("Department", studentInfo.department)}
                    {this.BuildTypography("Track", studentInfo.track)}
                    {this.BuildTypography("Requirement Version", studentInfo.reqVersionSem + " " + studentInfo.reqVersionYear)}
                    {this.BuildTypography("Entry Date", studentInfo.entrySem + " " + studentInfo.entryYear)}
                    {this.BuildTypography("Expected Graduation", studentInfo.gradSem + " " + studentInfo.gradYear)}
                    {this.BuildTypography("Project Option", studentInfo.projectOption)}
                    {this.BuildTypography("Faculty Advisor", studentInfo.facultyAdvisor)}
                    {this.BuildTypography("Graduated", studentInfo.graduated ? "Yes" : "No")}
                </CardContent>
            </Card>
        );
    }
}

export default StudentDetail;
