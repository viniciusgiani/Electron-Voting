import React from "react";
import { useAppSelector } from "../shared/hooks";
import LoginComponent from "./LoginComponent";
import HomeComponent from "./HomeComponent";
import { HashRouter, Outlet, Route, Routes } from "react-router-dom";
import App from "../app";

const RootComponent = React.memo((props: any) => {

    return (
        /** Added after the tutorial */
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<LoginComponent />} />
            </Routes>
        </HashRouter>

    )
})

export default RootComponent