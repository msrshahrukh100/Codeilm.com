import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import ReactGA from 'react-ga';
import { connect } from 'react-redux'
import * as actionCreators from './store/actions/index'

class App extends Component {
  componentDidMount() {
    ReactGA.set({ userId: this.props.userId });
    this.props.auth()
  }
  render() {
    return (
      <Layout />
    )
  }
}

const matchStateToProps = state => {
  return {
    userId: state.aReducer.user ? state.aReducer.user.id : ""
  }
}

const matchDispatchToProps = dispatch => {
  return {
    auth: () => dispatch(actionCreators.auth())
  }
}

export default connect(matchStateToProps, matchDispatchToProps)(App);
