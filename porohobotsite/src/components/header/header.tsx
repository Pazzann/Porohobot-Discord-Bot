import React, {Fragment, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import discordIcon from '../../img/discord-icon.svg';
import {NavLink} from "react-router-dom";
import {BackBut} from "./components/backBut";
import {Route, Routes} from "react-router";
import {DashboardBut} from "./components/dashboardBut";


export function Header() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [user, setUser] = useState<any>(null);
    let userGuilds: any;
    useEffect(() => {
        (async () => {
            if (cookies["connect.sid"]) {
                let request = await fetch('http://localhost:1234/api/user', {credentials: "include"});
                if (request.ok) {
                    const data = await request.json();
                    setUser(data);
                }
            }
        })();
    }, [cookies]);

    async function logout() {
        let request = await fetch('http://localhost:1234/api/logout', {credentials: "include"});
        if (request.ok) {
            setUser(null);
        }
    }

    return (
        <Fragment>
            <header>
                <div className="namebot">
                    <NavLink to="/" className="main botname">ПОРОХОБОТ</NavLink>
                    <div className="line"></div>
                    <div className="additional botdesc">
                        <span>Твій улюбленний</span>
                        <span className="desctextpadding">український бот</span>
                    </div>
                </div>
                <nav className="navbar" id="navbar">
                    {user ?
                        <Fragment>
                            <Routes>
                                <Route path="/" element={<DashboardBut/>}></Route>
                                <Route path="/dashboard" element={<BackBut/>}></Route>
                            </Routes>
                            <div className="user logout" id="logoutdiv" onClick={logout}>
                                <div className="main username">{user.username}</div>
                                <img className="useravatar"
                                     src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=60`}/>
                            </div>
                        </Fragment> :
                        <Fragment>
                            <button id="loginbutton" className="navbarbutton main"
                                    onClick={() => location.href = "https://discord.com/api/oauth2/authorize?client_id=989156095316590602&redirect_uri=http%3A%2F%2Flocalhost%3A1234%2Fapi%2Fcallback&response_type=code&scope=identify%20email%20guilds"}>
                                <img src={discordIcon}/>LOGIN
                            </button>
                        </Fragment>}
                </nav>
            </header>
        </Fragment>

    );

}