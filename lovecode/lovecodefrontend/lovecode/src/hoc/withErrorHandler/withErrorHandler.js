import React from 'react'
import Snackbar from '../../components/UI/Snackbar/Snackbar'
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import DetailPageSkeleton from '../../components/UI/SkeletonLoaders/DetailPageSkeleton'
import ListPageSkeleton from '../../components/UI/SkeletonLoaders/ListPageSkeleton'
import DetailPageLayout from '../../components/UI/DetailPageLayout/DetailPageLayout'
import LinearPreloader from '../../components/UI/SkeletonLoaders/LinearPreloader'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
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
      let skeleton = (<DetailPageLayout left=<PageLayout><DetailPageSkeleton /></PageLayout> />)
      if(type == "list") {
        skeleton = (<ListPageSkeleton />)
      }
      else if(type == "circular") {
        skeleton = <LinearPreloader />
      }
      else if(type == "detail") {
        skeleton = <DetailPageSkeleton />
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

  const mapStateToProps = state => {
    return {
      authenticated: state.aReducer.authenticated
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      onLogout: () => dispatch(actionCreators.authLogout())
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(withRouter(Cmp))
}


export default withErrorHandler
