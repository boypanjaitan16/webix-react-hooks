import {combineReducers} from 'redux'
import Cookies from 'js-cookie'
import axios from 'axios'


export default combineReducers({
    session : sessionReducer,
    error   : errorReducer
});

function sessionReducer(state = null, action){
    const {type, session}    = action

    if(type === "SET_SESSION"){
        axios.defaults.headers.common['Authorization']  = `Bearer ${session.token}`
        Cookies.set(`${process.env.REACT_APP_NAME}_session`, session, {expires: 7})
        return session
    }

    if(type === "CLEAR_SESSION"){
        delete axios.defaults.headers.common["Authorization"];
        Cookies.remove(`${process.env.REACT_APP_NAME}_session`)
        return false
    }

    return state
}

function errorReducer(state = null, action){
    const {type, message, severity}    = action

    if(type === 'SET_ERROR'){
        return {
            message,
            severity
        }
    }

    if(type === 'CLEAR_ERROR'){
        return null
    }

    return state
}