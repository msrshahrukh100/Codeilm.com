import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {Helmet} from "react-helmet"
import { List } from 'react-content-loader'
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import DetailPageLayout from '../../components/UI/DetailPageLayout/DetailPageLayout'
import VerticalLinearStepper from '../../components/UI/VerticalLinearStepper/VerticalLinearStepper'

class TutorialDetail extends React.Component {

  state = {
    tutorial: null,
    loading: true,
    error: null
  }

  componentDidMount() {
    console.log(this.props)
    const { hash_id } = this.props.match.params
    axios.get('/tutorials/' + hash_id)
      .then(response => {
        console.log(response.data)
        this.setState({
          tutorial: response.data,
          loading: false
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: error,
          loading: false
        })
      })
  }

  render() {
    const title = this.state.tutorial ? this.state.tutorial.title : null
    const content = this.state.tutorial ?
      (
        <PageLayout>
          <h1>{title}</h1>
          <p>sadf</p>
        </PageLayout>
      )
    : null

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Tutorial Detail</title>
        </Helmet>
        {!this.state.loading ?
          <DetailPageLayout left={content} right={<VerticalLinearStepper />}/>
          : null
        }
      </>
    )
  }
}

export default withErrorHandler(TutorialDetail, axios)
