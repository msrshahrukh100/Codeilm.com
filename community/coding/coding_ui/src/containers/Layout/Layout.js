import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Navigation from '../../components/Navigation/Navigation'
import Dashboard from '../../components/Dashboard/Dashboard'
import RepoDashboard from '../../components/RepoDashboard/RepoDashboard'
import { Switch, Route } from 'react-router-dom'
import { axiosInst as axios } from '../../Axios/githubAxios'
import moment from 'moment'
import MessageSnackbar from '../../components/UI/MessageSnackbar/MessageSnackbar'
import Progress from '../../components/UI/Progress/Progress'
import LeaderBoard from '../../components/LeaderBoard/LeaderBoard'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});


class Layout extends React.Component {

  state = {
    githubUsers: ['msrshahrukh100', 'ad-os', 'ageron', 'ahsankamal', 'ameenkhan07', 'dufferzafar'],
    githubUsersData: null,
    error: null,
    requestCompleted: false,
  }


  loadGithubData = (username) => {
    return axios.get("users/" + username + '/events?per_page=100')
      .then(response => {
        const avatar_url = response.data[0].actor.avatar_url
        const userId = response.data[0].actor.id
        const pushEvents = response.data.filter(item => item.type === 'PushEvent')
        const commitCounts = pushEvents.map(item => item.payload.distinct_size).reduce((a, b) => a + b, 0)
        const createEvents = response.data.filter(item => item.type === 'CreateEvent')
        const date = pushEvents[0] ? pushEvents[0].created_at : null
        const lastPushed = date ? moment(date).calendar() : null
        let userData = {
          id: userId,
          login: username,
          avatar_url: avatar_url,
          contributions: commitCounts,
          lastPushed: lastPushed,
          events: {
            pushEvents: pushEvents,
            createEvents: createEvents
          }
        }
      return userData
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: error.message
        })
      })
  }

  componentDidMount() {
    let githubPromises = []
    this.state.githubUsers.map(user => githubPromises.push(this.loadGithubData(user))
    )
    Promise.all(githubPromises).then(res => {
      this.setState({githubUsersData: res, requestCompleted: true})
    })
  }


  render() {
    const { classes } = this.props;
    const DashboardComponent = () => <Dashboard githubUsersData={this.state.githubUsersData} />
    const RepoDashboardComponent =  () => <RepoDashboard githubUsersData={this.state.githubUsersData} />
    const LeaderBoardComponent = () => <LeaderBoard githubUsersData={this.state.githubUsersData} />

    return (
      <div className={classes.root}>
        <Navigation />
        <main className={classes.content}>
        <div className={classes.toolbar} />
        <Progress onRequestComplete={this.state.requestCompleted} />
          <Switch>
            <Route path="/leaderboard" component={LeaderBoardComponent} />
            <Route path="/repositories" component={RepoDashboardComponent} />
            <Route path="/" component={DashboardComponent} />
          </Switch>
        </main>
        {this.state.error ? <MessageSnackbar message={this.state.error}/> : null}

      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Layout);
