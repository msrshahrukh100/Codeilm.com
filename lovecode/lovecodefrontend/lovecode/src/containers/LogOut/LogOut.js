import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index'
import axios from 'axios';
import getCookie from '../../utils/getCookie'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { withRouter } from 'react-router-dom'

class LogOut extends React.Component {

  componentDidMount() {
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    axios.post('https://codeilm.com/accounts/logout/', {})
    .then(response => {
      this.props.logout();
      this.props.history.push("/stories")
    })
    .catch(error => {
      console.log(error);
      this.setState({
        error: error
      })
    })

  }

  render() {
    return (<h3>Logging you out</h3>)
  }
}

const matchStateToProps = state => {
  return {
    authenticated: state.aReducer.authenticated
  }
}

const matchDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionCreators.authLogout())
  }
}

export default connect(matchStateToProps, matchDispatchToProps)(withRouter(LogOut));
