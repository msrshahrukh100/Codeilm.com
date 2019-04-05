import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {Helmet} from "react-helmet";

class TutorialDetail extends React.Component {

  state = {
    tutorials: null,
    loading: true,
    error: null
  }

  componentDidMount() {

  }

  render() {

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Tutorial Detail</title>
        </Helmet>
        <h4>Tutorial Details</h4>
      </>
    )
  }
}

export default withErrorHandler(TutorialDetail, axios)
