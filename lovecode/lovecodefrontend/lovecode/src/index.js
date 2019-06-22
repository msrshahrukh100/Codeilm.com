import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import repoDataReducer from './store/reducers/repoDataReducer'
import authReducer from './store/reducers/authReducer'
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-142472289-1', {debug: false});

const history = createBrowserHistory();

history.listen(function (location) {
  ReactGA.pageview(location.pathname + location.search)
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  rdReducer: repoDataReducer,
  aReducer: authReducer
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
