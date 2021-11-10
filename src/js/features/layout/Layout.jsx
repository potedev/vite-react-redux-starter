import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import { HeaderBar } from "../header/HeaderBar";

export const Layout = () => {
    return (
        <div className="layout">
            <div className="header-and-navigation">
                <HeaderBar />
                <ul style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/people">People</Link></li>
                    <li><Link to="/starships">Starships</Link></li>
                </ul>
            </div>
            <div className="page">
                <Outlet />
            </div>
        </div>
    )
}