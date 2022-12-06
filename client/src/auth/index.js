import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    SET_LOGGED_IN: "SET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    GUEST_USER: "GUEST_USER",
    SET_ERROR_MSG: "SET_ERROR_MSG"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        isGuest: false,
        errMsg: null,
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.SET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    isGuest: false,
                    errMsg: null
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    isGuest: false,
                    errMsg: null
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    isGuest: false,
                    errMsg: null
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: false,
                    isGuest: false,
                    errMsg: null
                })
            }
            case AuthActionType.GUEST_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    isGuest: true,
                    errMsg: null
                })
            }
            case AuthActionType.SET_ERROR_MSG: {
                return setAuth({
                    errMsg: payload
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(userName, firstName, lastName, email, password, passwordVerify) {
        try{
            console.log("auth.registerUser");
            console.log("userName: " + userName);
            const response = await api.registerUser(userName, firstName, lastName, email, password, passwordVerify);
            if (response.status === 200) {
                console.log("success. User:");
                console.log(response.data.user);
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/login/");
            }
        }
        catch(err){
            if(err && err.response){
                const errMsg = err.response.data.errorMessage;
                console.log("Error: " + errMsg);
                authReducer({
                    type: AuthActionType.SET_ERROR_MSG,
                    payload: errMsg
                });
            }
        }
    }

    auth.loginUser = async function(email, password) {
        try{
            console.log("auth.loginUser");
            const response = await api.loginUser(email, password);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        }
        catch(err){
            if(err){
                const errMsg = err.response.data.errorMessage;
                console.log("Error: " + errMsg);
                authReducer({
                    type: AuthActionType.SET_ERROR_MSG,
                    payload: errMsg
                });
            }
        }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    auth.clearErrorMsg = function(){
        authReducer( {
            type: AuthActionType.SET_ERROR_MSG,
            payload: null
        })
    }

    auth.continueAsGuest = function(){
        authReducer( {
            type: AuthActionType.GUEST_USER,
            payload: null
        })
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };