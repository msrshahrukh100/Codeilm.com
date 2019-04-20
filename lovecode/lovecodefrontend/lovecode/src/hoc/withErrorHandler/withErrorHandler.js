import React from 'react'
import Snackbar from '../../components/UI/Snackbar/Snackbar'
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import DetailPageSkeleton from '../../components/UI/SkeletonLoaders/DetailPageSkeleton'
import ListPageSkeleton from '../../components/UI/SkeletonLoaders/ListPageSkeleton'
import DetailPageLayout from '../../components/UI/DetailPageLayout/DetailPageLayout'

const withErrorHandler = (WrappedCompenent, axios, type="detail") => {
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
      let skeleton = (<DetailPageLayout left=<PageLayout><DetailPageSkeleton /></PageLayout> />)
      if(type == "list") {
        skeleton = (<PageLayout><ListPageSkeleton /></PageLayout>)
      }
      else if(type == "no-preloader") {
        skeleton = null
      }
      return (
        <>

            {this.state.loading ?  skeleton: null}
            {this.state.error ? this.state.error.message : null}
            {this.state.error ? <Snackbar show={true} type="error" text={this.state.error.message} /> : null}
          {!this.state.error ? <WrappedCompenent {...this.props} /> : null}
        </>
      )
    }
  }
}

export default withErrorHandler
