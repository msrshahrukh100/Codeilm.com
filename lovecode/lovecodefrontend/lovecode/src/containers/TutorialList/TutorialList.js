import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import MediaCard from '../../components/UI/MediaCard/MediaCard'
import TutorialInfo from '../../components/TutorialInfo/TutorialInfo'
import { withRouter } from "react-router";


class ExercisesContainer extends React.Component {

  state = {
    tutorials: null,
    loading: true,
    error: null
  }

  componentDidMount() {
    console.log(this.props)
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
      return <MediaCard key={tutorial.hash_id} link={this.props.match.path + '/' + tutorial.slug} content=<TutorialInfo /> title={tutorial.title} />
    })
     : null

    return (
      <>
        {tutorials}
      </>
    )
  }
}

export default withErrorHandler(withRouter(ExercisesContainer), axios)
