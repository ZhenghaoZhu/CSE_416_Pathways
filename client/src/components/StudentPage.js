import React, { Component } from "react";
import StudentHeader from "./StudentHeader";
import StudentTable from "./StudentTable";
import StudentDetail from "./StudentDetail";
import {
    Grid,
    Button,
    ButtonGroup,
    Box,
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    Card,
    CardContent
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Link } from "react-router-dom";
import Config from "../config.json";
import StudentProfile from "./StudentProfile";

const axios = require("axios").default;

class StudentPage extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.location.loggedInStudent;
        console.log(this.state);
    }
    makeCards(course_plan){
        let courses = []
        course_plan.map(e =>{
            courses.push(
                <Card>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {e}
                    </Typography>
                    </CardContent>
                </Card>
            )
        })
        return courses;
    }
    // editStudentData = (e) => {
    //     e.preventDefault();
    //     this.props.history.push({
    //         pathname: "/editLimitedStudent",
    //         student: this.state["focusStudent"],
    //     });
    // }
    render() {
        const courseplanObj = [];
        for (const [semester, course_plan] of Object.entries(this.state.coursePlan)) {
            courseplanObj.push(
                <Accordion
                    style={{ width: "80%", margin: "auto", marginTop: "20px" }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{semester}</Typography>
                    </AccordionSummary>
                    
                    <AccordionDetails>
                    {this.makeCards(course_plan)}
                    </AccordionDetails>

                </Accordion>
            );
        }

        return (
            <Box style={{ width: "99.82%" }}>
                {/* <StudentHeader curStudent={this.state.curStudent} /> */}
                <StudentHeader name = {this.state.firstName + " " + this.state.lastName}/>
                <Accordion
                    style={{ width: "80%", margin: "auto", marginTop: "20px" }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Student Profile</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <StudentProfile {...this.state}/>
                    </AccordionDetails>
                </Accordion>
                {courseplanObj}
                <ButtonGroup
                    variant="contained"
                    style={{
                        color: "#000000",
                        marginTop: 20,
                        marginLeft: "80%",
                    }}
                >
                    <Button>
                        <Link 
                            to={{
                                pathname: "/limitedEditStudent",
                                loggedInStudent: this.state
                            }}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            Edit Profile
                        </Link>
                    </Button>
                    <Button>Suggest Course Plan</Button>
                </ButtonGroup>
            </Box>
        );
    }
}

export default StudentPage;
