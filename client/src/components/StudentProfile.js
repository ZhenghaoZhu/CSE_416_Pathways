import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Config from "../config.json";

class StudentProfile extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <table style={{ width: "100%", borderCollapse: "separate" }}>
                <thead>
                    <tr style={{ backgroundColor: "#bfbfbf" }}>
                        <td style={{ fontWeight: "bold" }}>First Name</td>
                        <td style={{ backgroundColor: "#f0f0f0" }}>{this.props.firstName}</td>
                        <td style={{ fontWeight: "bold" }}>Last Name</td>
                        <td style={{ backgroundColor: "#f0f0f0" }}>{this.props.lastName}</td>
                    </tr>
                    <tr style={{ backgroundColor: "#bfbfbf" }}>
                        <td style={{ fontWeight: "bold" }}>SBU ID</td>
                        <td style={{ backgroundColor: "#f0f0f0" }}>{this.props.id}</td>
                        <td style={{ fontWeight: "bold" }}>Email</td>
                        <td style={{ backgroundColor: "#f0f0f0" }}>{this.props.email}</td>
                    </tr>
                    <tr style={{ backgroundColor: "#bfbfbf" }}>
                        <td style={{ fontWeight: "bold" }}>GPA</td>
                        <td style={{ backgroundColor: "#f0f0f0" }}>{this.props.gpa}</td>
                        <td style={{ fontWeight: "bold" }}>Department</td>
                        <td style={{ backgroundColor: "#f0f0f0" }}>{this.props.department}</td>
                    </tr>
                    <tr style={{ backgroundColor: "#bfbfbf" }}>
                        <td style={{ fontWeight: "bold" }}>Track</td>
                        <td style={{ backgroundColor: "#f0f0f0" }}>{this.props.track}</td>
                        <td style={{ fontWeight: "bold" }}>Requirement Version</td>
                        <td style={{ backgroundColor: "#f0f0f0" }}>{this.props.reqVersionSem + " " + this.props.reqVersionYear}</td>
                    </tr>
                    <tr style={{ backgroundColor: "#bfbfbf" }}>
                        <td style={{ fontWeight: "bold" }}>Entry Date</td>
                        <td style={{ backgroundColor: "#f0f0f0" }}>{this.props.entrySem + " " + this.props.entryYear}</td>
                        <td style={{ fontWeight: "bold" }}>Expected Graduation</td>
                        <td style={{ backgroundColor: "#f0f0f0" }}>{this.props.gradSem + " " + this.props.gradYear}</td>
                    </tr>
                    <tr style={{ backgroundColor: "#bfbfbf" }}>
                        <td style={{ fontWeight: "bold" }}>Project Option</td>
                        <td style={{ backgroundColor: "#f0f0f0" }}>{this.props.projectOption}</td>
                        <td style={{ fontWeight: "bold" }}>Faculty Advisor</td>
                        <td style={{ backgroundColor: "#f0f0f0" }}>{this.props.facultyAdvisor}</td>
                    </tr>
                    <tr style={{ backgroundColor: "#bfbfbf" }}>
                        <td style={{ fontWeight: "bold" }}>Degree Requirements</td>
                        <td style={{ backgroundColor: "#f0f0f0" }}>{this.props.degreeRequirements.toString()}</td>
                        <td style={{ fontWeight: "bold" }}>Graduated</td>
                        <td style={{ backgroundColor: "#f0f0f0" }}>{this.props.graduated ? "Yes" : "No"}</td>
                    </tr>
                </thead>
            </table>
        );
    }
}

export default StudentProfile;
