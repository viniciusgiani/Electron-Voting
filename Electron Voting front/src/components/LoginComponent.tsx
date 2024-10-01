import { MDBBtn, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import { post_request } from "../shared/functions";
import { user_data_db_name } from "../shared/constants";
import { useAppDispatch } from "../shared/hooks";
import { updateUserDetails } from "../shared/rdx-slice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginComponent = React.memo((props: any) => {
    const navigate = useNavigate()
    const [loginDetails, setLoginDetails] = React.useState({
        email: '',
        password: ''
    })
    const [signUpDetails, setSignUpDetails] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const dispatch = useAppDispatch()

    const handleLoginChange = React.useCallback((e: any) => {
        console.log(e);
        const elem = e.currentTarget as HTMLInputElement
        const value = {} as any
        value[elem.name] = elem.value
        setLoginDetails({...loginDetails, ...value})
    }, [loginDetails])

    const handleSignupChange = React.useCallback((e: any) => {
        const elem = e.currentTarget as HTMLInputElement
        const value = {} as any
        value[elem.name] = elem.value
        setSignUpDetails({...signUpDetails, ...value})
    }, [signUpDetails])

    const handleSignUp = React.useCallback(async () => {
        const request_signup = await post_request('user/save', signUpDetails)
        if (request_signup == undefined) return;
        console.log("request_signup", request_signup);
        window.electron.save_data({
            key: user_data_db_name,
            value: request_signup.access_token
        })
        const user_data = jwtDecode(request_signup.access_token) as any
        
        dispatch(updateUserDetails({
            token: request_signup.access_token,
            name: user_data.name,
            email: user_data.email
        }))

        navigate('/')
        
    }, [signUpDetails])

    const handleLogin = React.useCallback(async () => {
        const request_login = await post_request('user/login', loginDetails)
        if (request_login == undefined) return;
        console.log("request_login", request_login);
        window.electron.save_data({
            key: user_data_db_name,
            value: request_login.access_token
        })
        const user_data = jwtDecode(request_login.access_token) as any
        
        dispatch(updateUserDetails({
            token: request_login.access_token,
            name: user_data.name,
            email: user_data.email
        }))
        navigate('/')
        
    }, [loginDetails])

    return (
        <MDBContainer fluid className="py-3 px-4">
            <MDBRow>
                <div className="h2 mb-3">Login</div>
                <MDBInput
                    value={loginDetails.email}
                    name='email'
                    type="email"
                    onChange={handleLoginChange}
                    required
                    label='Enter your email'
                />
                <div className="mb-3"></div>
                <MDBInput
                    value={loginDetails.password}
                    name='password'
                    type="password"
                    onChange={handleLoginChange}
                    required
                    label='Enter your password'
                />
                <div className="mb-3"></div>
                <MDBBtn onClick={handleLogin}>Login</MDBBtn>
            </MDBRow>
            <MDBRow className="mt-4">
                <div className="h2 mb-3">SignUp</div>
                <MDBInput
                    value={signUpDetails.name}
                    name='name'
                    type="name"
                    onChange={handleSignupChange}
                    required
                    label='Enter your full name'
                />
                <div className="mb-3"></div>
                <MDBInput
                    value={signUpDetails.email}
                    name='email'
                    type="email"
                    onChange={handleSignupChange}
                    required
                    label='Enter your email'
                />
                <div className="mb-3"></div>
                <MDBInput
                    value={signUpDetails.password}
                    name='password'
                    type="password"
                    onChange={handleSignupChange}
                    required
                    label='Enter your password'
                />
                <div className="mb-3"></div>
                <MDBBtn onClick={handleSignUp}>SignUp</MDBBtn>
            </MDBRow>
        </MDBContainer>
    )
})

export default LoginComponent;