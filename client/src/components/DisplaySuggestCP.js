import React, { Component } from "react";
import { DataGrid} from "@material-ui/data-grid";
import SearchBar from "material-ui-search-bar";
import { Box, Button, ButtonGroup } from "@material-ui/core";
import Config from "../config.json";

var columns = [
    { field: "department", headerName: "Department", width: 130 },
    { field: "courseNum", headerName: "Course Number", width: 160 },
    { field: "year", headerName: "Year", width: 100 },
    { field: "semester", headerName: "Semester", width: 130 },
    { field: "credits", headerName: "Credits", type: "number", width: 100 },
    { field: "timeSlot", headerName: "Time Slot", width: 200 },
];
var suggestCourses = [
    {
        id: "AMS500",
        department: "AMS",
        courseNum: "500",
        semester: "Fall",
        year: "2020",
        credits: 3,
        timeSlot: "MW 8:00AM - 10:20AM",
    },
    {
        id: "AMS502",
        department: "AMS",
        courseNum: "502",
        semester: "Fall",
        year: "2020",
        credits: 3,
        timeSlot: "MW 11:00AM - 12:40PM",
    },
    {
        id: "AMS535",
        department: "AMS",
        courseNum: "535",
        semester: "Fall",
        year: "2020",
        credits: 3,
        timeSlot: "TuTH 8:00PM - 10:20PM",
    },
];
class DisplaySuggestCP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectionModel: [],
            courseList: []
        };
        this.setsetSelectionModel = this.setSelectionModel.bind(this);
    }
    setSelectionModel(selection) {
        let result = [];
        for(var i = 0;i < selection.length;i++){
            for(var j = 0;j < suggestCourses.length;j++){
                if(suggestCourses[j].id === selection[i]){
                    var arr = [selection[i],suggestCourses[j].semester,suggestCourses[j].year];
                    result.push(arr);
                }
            }
        }
        this.setState({selectionModel:selection});
        this.setState({courseList:result});
    }
    addSelectedCourses() {// TODO: ADD Selected coures here.
        console.log(this.state);
    }
    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Suggested Course Plan</h1>
                <Box
                    style={{
                        height: 650,
                        width: "60%",
                        marginBottom: 100,
                        margin: "auto",
                        marginTop: 50,
                        backgroundColor: "#f1f0f0",
                    }}
                >
                    <DataGrid
                        rows={suggestCourses}
                        columns={columns}
                        pageSize={15}
                        disableSelectionOnClick={true}
                        autoPageSize={true}
                        checkboxSelection
                        onSelectionModelChange={(newSelection) => {
                            this.setSelectionModel(newSelection.selectionModel);
                        }}
                        selectionModel={this.state.selectionModel}
                        // loading={this.state.studentFilter.length === 0}
                    />
                    <Button
                        onClick={() => this.addSelectedCourses()}
                        variant="contained"
                        color="secondary"
                        style={{
                            margin: "auto",
                            marginTop: 20,
                            marginLeft: "75%",
                        }}
                    >
                        Accept Selected Courses
                    </Button>
                </Box>
            </div>
        );
    }
}

export default DisplaySuggestCP;
