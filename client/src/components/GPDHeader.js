import React, { Component } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { Link } from "react-router-dom";
import { MenuItem, Menu } from "@material-ui/core";
import Config from "../config.json";

class GPDHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorEl: null,
			currentGPD: this.props.curGPD,
		};
	}

	handleOpen = (event) => {
		console.log(event.currentTarget);
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};
	render() {
		var gpdName = "Emerson True";
		if (this.state.currentGPD !== undefined) {
			gpdName = this.state.currentGPD.firstName + " " + this.state.currentGPD.lastName;
		}
		return (
			<AppBar position="static" style={{ background: "#e35a5a" }}>
				<Toolbar>
					<img src="https://i.ibb.co/9H09g8M/Pathways-Logo-Bordered.png" width="38px" alt="" />
					<Typography variant="h6" style={{ marginLeft: "45px" }}>
						<Link
							to="/"
							style={{
								textDecoration: "none",
								color: "inherit",
							}}
						>
							Home
						</Link>
					</Typography>
					<Typography variant="h6" style={{ marginLeft: "35px" }}>
						<Link
							to="/login"
							style={{
								textDecoration: "none",
								color: "inherit",
							}}
						>
							Login
						</Link>
					</Typography>
					<Typography variant="h6" style={{ marginLeft: "35px" }}>
						<Link
							to="/enrollmentTrends"
							style={{
								textDecoration: "none",
								color: "inherit",
							}}
						>
							Enrollment Trends
						</Link>
					</Typography>
					<Typography variant="h5" style={{ marginLeft: "auto" }}>
						{gpdName}
					</Typography>
					<IconButton color="inherit">
						<AccountBoxIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		);
	}
}

export default GPDHeader;
