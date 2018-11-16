import React from 'react'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { baseAxiosInst as axios} from '../../Axios/githubAxios'
import RepoPanel from '../RepoPanel/RepoPanel'
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  avatar: {
    margin: 10,
    width: 100,
    height: 100,
  },
  root: {
    color: 'white',
  },
  paper: {
    color: 'white',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});


class RepoDashboard extends React.Component {

  state = {
    repoData: null,
    loading: true,
  }

  loadRepoData = (repoUrl) => {
    return axios.get(repoUrl)
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log(error)
      })
  }

  getRepoData = () => {
    const { githubUsersData } = this.props
    const toReducePushEvents = githubUsersData ? githubUsersData.map(item => item.events.pushEvents) : null
    const allPushEvents = toReducePushEvents ? toReducePushEvents.reduce((accumulator, item) => accumulator.concat(item), []) : null
    let uniqueRepo = []
    const uniquePushEvents = allPushEvents ? allPushEvents.filter(item => {
      if(!uniqueRepo.includes(item.repo.name)) {
        uniqueRepo.push(item.repo.name)
        return true
      }
      return false
    }) : null

    const repositoriesUrls = uniquePushEvents ? uniquePushEvents.map(item => item.repo.url) : null
    let repositoryRequestPromises = []
    let temp = repositoriesUrls ? repositoriesUrls.map(url => repositoryRequestPromises.push(this.loadRepoData(url))) : null
    Promise.all(repositoryRequestPromises)
      .then(response => this.setState({repoData: response, loading: false}))
      .catch(error => console.log(error))
  }


  componentDidMount() {
    this.getRepoData()

  }


  render() {
    const { classes } = this.props
    const repositories = this.state.repoData ? this.state.repoData.map(item => {
      if(item) {
        return <RepoPanel key={item.id} repoData={item} />
      }
    }) : null

    return (
      <div className={classes.root}>
        {this.state.loading ? <CircularProgress className={classes.progress} /> : null}
        <Grid container spacing={16}>
          {repositories}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(RepoDashboard)
