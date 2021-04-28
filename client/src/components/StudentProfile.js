import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Config from "../config.json";

class StudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curStudent: {},
        };
    }

    render() {
        var studentInfo = undefined;
        if (Object.keys(this.state.curStudent).length !== 0) {
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
        return (
            <table style={{width:"100%",borderCollapse:"separate"}}>
                <tr style = {{backgroundColor:"#bfbfbf"}}>
                    <td style = {{fontWeight:"bold"}}>First Name</td>
                    <td style = {{backgroundColor:"#f0f0f0"}}>{studentInfo.firstName}</td>
                    <td style = {{fontWeight:"bold"}}>Last Name</td>
                    <td style = {{backgroundColor:"#f0f0f0"}}>{studentInfo.lastName}</td>
                </tr>
                <tr style = {{backgroundColor:"#bfbfbf"}}>
                    <td style = {{fontWeight:"bold"}}>SBU ID</td>
                    <td style = {{backgroundColor:"#f0f0f0"}}>{studentInfo.id}</td>
                    <td style = {{fontWeight:"bold"}}>Email</td>
                    <td style = {{backgroundColor:"#f0f0f0"}}>{studentInfo.email}</td>
                </tr>
                <tr style = {{backgroundColor:"#bfbfbf"}}>
                    <td style = {{fontWeight:"bold"}}>GPA</td>
                    <td style = {{backgroundColor:"#f0f0f0"}}>{studentInfo.gpa}</td>
                    <td style = {{fontWeight:"bold"}}>Department</td>
                    <td style = {{backgroundColor:"#f0f0f0"}}>{studentInfo.department}</td>
                </tr>
                <tr style = {{backgroundColor:"#bfbfbf"}}>
                    <td style = {{fontWeight:"bold"}}>Track</td>
                    <td style = {{backgroundColor:"#f0f0f0"}}>{studentInfo.track}</td>
                    <td style = {{fontWeight:"bold"}}>Requirement Version</td>
                    <td style = {{backgroundColor:"#f0f0f0"}}>{studentInfo.reqVersionSem+ " " + studentInfo.reqVersionYear}</td>
                </tr>
                <tr style = {{backgroundColor:"#bfbfbf"}}>
                    <td style = {{fontWeight:"bold"}}>Entry Date</td>
                    <td style = {{backgroundColor:"#f0f0f0"}}>{studentInfo.entrySem + " " + studentInfo.entryYear }</td>
                    <td style = {{fontWeight:"bold"}}>Expected Graduation</td>
                    <td style = {{backgroundColor:"#f0f0f0"}}>{studentInfo.gradSem+ " " + studentInfo.gradYear}</td>
                </tr>
                <tr style = {{backgroundColor:"#bfbfbf"}}>
                    <td style = {{fontWeight:"bold"}}>Project Option</td>
                    <td style = {{backgroundColor:"#f0f0f0"}}>{studentInfo.projectOption }</td>
                    <td style = {{fontWeight:"bold"}}>Faculty Advisor</td>
                    <td style = {{backgroundColor:"#f0f0f0"}}>{studentInfo.facultyAdvisor}</td>
                </tr>
                <tr style = {{backgroundColor:"#bfbfbf"}}>
                    <td style = {{fontWeight:"bold"}}>Degree Requirements</td>
                    <td style = {{backgroundColor:"#f0f0f0"}}>{studentInfo.degreeRequirements }</td>
                    <td style = {{fontWeight:"bold"}}>Graduated</td>
                    <td style = {{backgroundColor:"#f0f0f0"}}>{studentInfo.graduated ? "Yes" : "No"}</td>
                </tr>
            </table>
        );
    }
}

export default StudentProfile;
