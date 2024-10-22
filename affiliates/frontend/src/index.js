import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();


const debug = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
if(debug) {
  sessionStorage.setItem("user_profile_id", "qyGdkNV")
}

ReactGA.initialize('UA-142472289-1', {debug: debug});

const history = createBrowserHistory();

history.listen(function (location) {
  ReactGA.pageview(location.pathname + location.search)
})
ReactGA.pageview("/stories")


const app = (
  <MuiThemeProvider theme={theme}>
    <Router basename='/' history={history}>
      <App/>
    </Router>
  </MuiThemeProvider>
)


ReactDOM.render(app, document.getElementById('codeilm'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
