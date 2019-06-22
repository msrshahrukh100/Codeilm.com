import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import ReactGA from 'react-ga';
import { connect } from 'react-redux'


class App extends Component {
  componentDidMount() {
    ReactGA.set({ userId: this.props.userId });
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

export default connect(matchStateToProps, null)(App);
