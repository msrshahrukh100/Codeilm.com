import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import authReducer from './store/reducers/authReducer'
import projectReducer from './store/reducers/projectReducer'
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga';

const debug = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"

ReactGA.initialize('UA-142472289-1', {debug: debug});

const history = createBrowserHistory();

history.listen(function (location) {
  ReactGA.pageview(location.pathname + location.search)
})

const composeEnhancers = debug && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  aReducer: authReducer,
  pReducer: projectReducer
})



const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));


const app = (
  <Router basename='/' history={history}>
    <Provider store={store}>
      <App/>
    </Provider>
  </Router>
)




ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
