import React from "react";
import { Provider } from "react-redux";
import { store } from "./shared/store";
import { RouterProvider, HashRouter, useNavigate, Route, Routes } from "react-router-dom";
import { router } from "./shared/router";
import { axios_instance, user_data_db_name } from "./shared/constants";
import { updateUserDetails } from "./shared/rdx-slice";
import { useAppDispatch } from "./shared/hooks";
import { jwtDecode } from "jwt-decode";
import { set_a_token } from "./shared/functions";
import HomeComponent from "./components/HomeComponent";
import LoginComponent from "./components/LoginComponent";

const App = React.memo((props: any) => {
    const dispatch = useAppDispatch();
    /** ===>>> Added after the tutorial */ const navigate = useNavigate()

    const handleGetToken = React.useCallback(async () => {
        const get_token = await window.electron.get_data(user_data_db_name)
        console.log("get_token", get_token);

        
        if (!get_token) return /** ===>>> Added after the tutorial */ navigate('/login');
        // if (!get_token) return;
        const user_data = jwtDecode(get_token[user_data_db_name] || get_token) as any
        
        dispatch(updateUserDetails({
            token: get_token,
            name: user_data.name,
            email: user_data.email
        }))

        /** ===>>> Added after the tutorial */ navigate('/')


    }, []);

    React.useLayoutEffect(() => {
        handleGetToken()
    }, []);

    return (
        <HomeComponent />
    )
})

export default App