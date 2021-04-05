import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './redux/store'
import {setSession, clearSession} from './redux/actions'
import {Provider} from 'react-redux'
import Cookies from 'js-cookie'

window.axios = require('axios');

window.axios.defaults.withCredentials = false;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Accept'] = 'application/json';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';
window.axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const store     = configureStore()
const session   = Cookies.getJSON(`${process.env.REACT_APP_NAME}_session`)

window.axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  if(error.response.status === 401){
    store.dispatch(clearSession())
  }
  
  store.dispatch({
    type  : 'SET_ERROR',
    message : error.response?.data?.message
  })

  return Promise.reject(error);
});

if(session){
  store.dispatch(setSession(session))
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
