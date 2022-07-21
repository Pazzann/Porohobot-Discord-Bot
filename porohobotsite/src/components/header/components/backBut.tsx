import React, {Fragment, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";


export function BackBut(){

    return (
        <Fragment>
            <NavLink to="/" id="dashboard" className="navbarbutton main">BACK</NavLink>
        </Fragment>
    );
}