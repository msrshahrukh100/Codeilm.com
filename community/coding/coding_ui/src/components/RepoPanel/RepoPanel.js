import React from 'react'
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { baseAxiosInst as axios} from '../../Axios/githubAxios'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Aux from '../../hoc/Aux/Aux'
import './devicon.min.css'
import LanguageIcon from './LanguageIcon/LanguageIcon'
import moment from 'moment'
import { StarRate, DeviceHub } from '@material-ui/icons';
import FaceIcon from '@material-ui/icons/Face';


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
  languages: {
    textDecoration: 'none'
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  icon: {
    color: '#ffd600',
  }
});

class RepoPanel extends React.Component {
  state = {
    languages: null
  }
  componentDidMount() {
    const repoUrl = this.props.repoData.languages_url
    axios.get(repoUrl)
      .then(response => this.setState({languages: response.data}))
  }

  render() {
    const { classes, repoData } = this.props
    const avatarURL = repoData.owner.avatar_url
    const username = repoData.owner.login
    const subheader = (
      <Aux>
        <p>{repoData.description}</p>
        <p>Last updated: {moment(repoData.updated_at).calendar()}</p>
        <p>
          <a
            className={classes.languages}
            href={repoData.html_url}
            target="_blank">
            <Tooltip title="View this repo on GitHub">
              <i style={{fontSize: '20px'}} className="devicon-github-plain colored"></i>
            </Tooltip>
          </a>
          {this.state.languages ? <LanguageIcon languages={this.state.languages} /> : null}
        </p>

        <Tooltip title={"This repository is owned by " + username}>
          <Chip
            label={username}
            color="secondary"
            avatar={<Avatar src={avatarURL} />}
            variant="outlined" />
        </Tooltip>
      </Aux>
    )
    const title = (
      <Aux>
        <h4>{repoData.name}</h4>
        {repoData.stargazers_count ?
          <Tooltip title={ repoData.stargazers_count + " stars on this repository"}>
            <Chip
              avatar={
                <Avatar className={classes.transparentBackground}>
                  <StarRate className={classes.icon} />
                </Avatar>
              }
              label={ repoData.stargazers_count + " stars"}
              className={classes.transparentBackground}
              variant="outlined"
            />
          </Tooltip>
        : null}

        {repoData.forks_count ?
          <Tooltip title={ repoData.forks_count + " forks of this repository"}>
            <Chip
              avatar={
                <Avatar className={classes.transparentBackground}>
                  <DeviceHub />
                </Avatar>
              }
              label={ repoData.forks_count + " forks"}
              className={classes.transparentBackground}
              variant="outlined"
            />
          </Tooltip>
          : null }

      </Aux>
    )

    return (
      <Grid item xs={12} sm={12} lg={3}>
        <Paper className={classes.paper}>
          <div className={classes.row}>
            <CardHeader
                title={title}
                subheader={subheader}
              />

          </div>
        </Paper>
      </Grid>
    )
  }
}

export default withStyles(styles)(RepoPanel)
