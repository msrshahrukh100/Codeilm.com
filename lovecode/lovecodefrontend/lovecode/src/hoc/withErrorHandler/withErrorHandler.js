import React from 'react'
import Snackbar from '../../components/UI/Snackbar/Snackbar'
import LinearPreloader from '../../components/UI/LinearPreloader/LinearPreloader'

const withErrorHandler = (WrappedCompenent, axios) => {
  return class extends React.Component {
    state = {
      error: null,
      loading: null
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: null, loading: true})
        return request
      }, error => {
        this.setState({
          error: error,
          loading: false
        })
      })

      this.resInterceptor = axios.interceptors.response.use(response => {
        this.setState({loading: false})
        return response
      }, error => {
        this.setState({
          error: error,
          loading: false
        })
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    hideErrorHandler = () => {
      this.setState({
        error: null,
      })
    }

    render() {
      return (
        <>

            {this.state.loading ? <LinearPreloader /> : null}
            {this.state.error ? this.state.error.message : null}
            {this.state.error ? <Snackbar show={true} type="error" text={this.state.error.message} /> : null}
          {!this.state.error ? <WrappedCompenent {...this.props} /> : null}
        </>
      )
    }
  }
}

export default withErrorHandler
