import React, {Fragment, useEffect, useState} from 'react';
import './App.css';
import {useCookies} from "react-cookie";
import {Route, Routes} from "react-router";
import {NavLink} from "react-router-dom";

//components
import {Header} from "./components/header/header";
import {HomeAside} from "./components/homeAside";

//pages
import {Home} from "./pages/home";
import {Dashboard} from "./pages/dashboard";
import {DashboardAside} from "./components/dashboardAside";



function App() {
    let i = 0
    function experiment(){
        i++;
    }
    setInterval(experiment, 100);


    return (
        <div className="App">

            <Header/>
            <div className="pageContent">
                <aside className="aside">
                    <Routes>
                        <Route path="/" element={<HomeAside />}></Route>
                        <Route path="/dashboard" element={<DashboardAside />}></Route>
                    </Routes>
                </aside>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/dashboard" element={<Dashboard />}></Route>
                    </Routes>
                </div>
            </div>
            <footer>
                <div className="footerBottom">
                    Test
                </div>
            </footer>
        </div>
    );
}

export default App;
