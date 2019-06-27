import React from 'react'
import Snackbar from '../../components/UI/Snackbar/Snackbar'
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import LinearPreloader from '../../components/UI/SkeletonLoaders/LinearPreloader'
import { withRouter } from "react-router";

const withErrorHandler = (WrappedCompenent, axios, type) => {
  class Cmp extends React.Component {
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
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          this.props.onLogout()
          this.props.history.push("/login/?next=" + this.props.match.path)
        }
        else {
          this.setState({
            error: error,
            loading: false
          })
        }

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
      let skeleton = null
      if(type == "list") {
        skeleton = (<LinearPreloader />)
      }
      else if(type == "circular") {
        skeleton = <LinearPreloader />
      }
      else if(type == "detail") {
        skeleton = <LinearPreloader />
      }
      else {
        skeleton = null
      }
      return (
        <>

            {skeleton ? this.state.loading ?  skeleton: null : null}
            {this.state.error ? this.state.error.message : null}
            {this.state.error ? <Snackbar open={true} type="error" text={this.state.error.message} /> : null}
          {!this.state.error ? <WrappedCompenent {...this.props} /> : null}
        </>
      )
    }
  }


  return withRouter(Cmp)
}


export default withErrorHandler
