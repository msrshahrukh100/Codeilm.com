import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import ReactGA from 'react-ga';


class App extends Component {

  componentDidUpdate(prevProps) {
    if(this.props.userId) {
      console.log(this.props.userId);
      ReactGA.set({ userId: this.props.userId });
    }
  }

  render() {
    return (<>
      <Layout />
      </>
    )
  }
}

export default App;
