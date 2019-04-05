import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

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
        <h4>Tutorial Details</h4>
      </>
    )
  }
}

export default withErrorHandler(TutorialDetail, axios)
