import React from 'react'
import Paper from '../../components/UI/Paper/Paper'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import MediaCard from '../../components/UI/MediaCard/MediaCard'

class RepoList extends React.Component {

  state = {
    userrepositories: null,
    pageNumber: 0,
    loading: true,
    error: null
  }

  componentDidMount() {
    axios.get('/userrepositories/' + this.state.pageNumber, {withCredentials: true})
      .then(response => {
        console.log(response.data)
        this.setState({
          userrepositories: response.data,
          loading: false
        })

      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false
        })
      })
  }

  render() {
    const repos = this.state.userrepositories ?
    this.state.userrepositories.map(repo => <MediaCard key={repo.id} title={repo.name} />)
      : null
    return (
      <>
      {repos}
      </>
    )
  }
}

export default withErrorHandler(RepoList, axios)
