import React from 'react'
import Snackbar from '../../components/UI/Snackbar/Snackbar'
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import DetailPageSkeleton from '../../components/UI/SkeletonLoaders/DetailPageSkeleton'
import ListPageSkeleton from '../../components/UI/SkeletonLoaders/ListPageSkeleton'
import DetailPageLayout from '../../components/UI/DetailPageLayout/DetailPageLayout'
import LinearPreloader from '../../components/UI/SkeletonLoaders/LinearPreloader'

const withErrorHandler = (WrappedCompenent, axios, type) => {
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
        if(error.response.status === 401 || error.response.status === 403){
          console.log("page to be shown");
          const next= this.props.match.url
          this.props.history.push({
            pathname: '/login',
            search: '?next=' + next,
          })
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
      let skeleton = (<DetailPageLayout left=<PageLayout><DetailPageSkeleton /></PageLayout> />)
      if(type == "list") {
        skeleton = (<PageLayout><ListPageSkeleton /></PageLayout>)
      }
      else if(type == "circular") {
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
}

export default withErrorHandler
