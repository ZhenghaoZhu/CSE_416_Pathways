import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import SearchBar from "material-ui-search-bar";
import Config from "../config.json";

const axios = require("axios").default;

var columns = [
	{ field: "courseName", headerName: "Course Name", width: 130 },
	{ field: "courseIden", headerName: "Course ID", width: 130 },
	{ field: "department", headerName: "Department", width: 130 },
	{ field: "credits", headerName: "Credits", width: 130 },
	{ field: "preReq", headerName: "Pre Reqs", width: 130 },
	{
		field: "courseDescription",
		headerName: "Course Description",
		width: 130,
	},
	{ field: "yearTrends", headerName: "Year Trends", width: 130 },
	{ field: "timeSlots", headerName: "Time Slots", width: 130 },
	{ field: "professorNames", headerName: "Professor Names", width: 130 },
];

class CourseTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curCourses: [],
		};
		this.courseFilter = [];
	}

	componentDidMount() {
		this.getCourses();
		console.log(this.state.curCourses);
	}

	getCourses() {
		axios
			.get(Config.URL + "/courses/")
			.then((response) => {
				this.courseFilter = response.data;
				this.setState({
					curCourses: response.data,
				});
			})
			.catch(function (error) {
				console.log(error);
			})
			.then(function () {
				console.log("After axios request:");
			});
	}

	filterCourses(e) {
		// this.setState({curCourses: this.state.curCourses.filter(course => course.courseName.includes(e))})
		this.courseFilter = this.state.curCourses.filter((course) => course.courseName.includes(e, 0));
		this.setState({ curCourses: this.state.curCourses });
	}

	render() {
		return (
			<div style={{ height: 600, width: "100%", marginBottom: 100 }}>
				<h2>Courses Summary Table</h2>
				<SearchBar placeholder="Search by Course Name, ID, ..." onChange={(newValue) => this.filterCourses(newValue)} />
				<DataGrid rows={this.courseFilter} columns={columns} pageSize={10} checkboxSelection />
			</div>
		);
	}
}

export default CourseTable;
