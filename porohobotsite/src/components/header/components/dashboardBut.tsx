import React, {Fragment, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";


export function DashboardBut(){

    return (
        <Fragment>
            <NavLink to="/dashboard" id="dashboard" className="navbarbutton main">DASHBOARD</NavLink>
        </Fragment>
    );
}