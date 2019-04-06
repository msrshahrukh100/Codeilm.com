import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import MediaCard from '../../components/UI/MediaCard/MediaCard'
import TutorialInfo from '../../components/TutorialInfo/TutorialInfo'
import { withRouter } from "react-router";
import {Helmet} from "react-helmet";


class ExercisesContainer extends React.Component {

  state = {
    tutorials: null,
    loading: true,
    error: null
  }

  componentDidMount() {
    axios.get('/tutorials')
      .then(response => {
        console.log(response.data)
        this.setState({
          tutorials: response.data,
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

    const tutorials = this.state.tutorials ?
    this.state.tutorials.results.map((tutorial, index) => {
      return <MediaCard
        key={tutorial.hash_id}
        link={this.props.match.path + '/' + tutorial.hash_id + '/' + tutorial.slug}
        content=<TutorialInfo />
        title={tutorial.title} />
    })
     : null

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Tutorials on Allywith</title>
        </Helmet>
        {tutorials}
      </>
    )
  }
}

export default withErrorHandler(withRouter(ExercisesContainer), axios)
