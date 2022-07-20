import React, {Fragment, useEffect, useState} from 'react';
import './App.css';
import {useCookies} from "react-cookie";
import {Route, Routes} from "react-router";
import {NavLink} from "react-router-dom";

//components
import {Header} from "./components/header";

//pages
import {Home} from "./pages/home";
import {Dashboard} from "./pages/dashboard";


function App() {
    let i = 0
    function experiment(){
        i++;
    }
    setInterval(experiment, 100);


    return (
        <div className="App">

            <Header/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                </Routes>


                <footer>
                    <div className="bot-description">
                        <p>PETst</p>
                    </div>
                </footer>

            </div>
        </div>
    );
}

export default App;
