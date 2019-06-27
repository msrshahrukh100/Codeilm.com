import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { MdGridOn } from "react-icons/md";
import TutorialList from '../TutorialList/TutorialList'
import withTheme from './withTheme';
import theme from './theme';
import atoms from './atoms';
import molecules from './molecules';
import axios from '../../user_axios'

const { Avatar, Icon, Typography } = atoms;
const { Tabs, Tab } = molecules;

const styles = theme => ({
  avatar: {
    height: theme.spacing(25),
    width: theme.spacing(25),
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(21),
      width: theme.spacing(21),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(15),
      width: theme.spacing(15),
    },
  }
});

class ProfilePage extends React.Component {
  state = {
    tabIndex: 0
  }

  constructor(props) {
    super(props)
    const { userId } = this.props.match.params;
    this.state = {
      userId: userId,
      profileData: null
    }
  }

  fetchProfileData = () => {
    axios.get(`/users/${this.state.userId}`)
    .then(response => {
      this.setState({
        profileData: response.data
      })
    })
    .catch(error => {
      this.setState({
        loading: false,
        error: error
      })
    })
  }

  componentDidMount() {
    this.fetchProfileData()
  }

  componentDidUpdate(prevProps) {
    const newUserId = this.props.match.params.userId;
    const prevUserId = prevProps.match.params.userId;

    if(prevUserId !== newUserId) {
      this.setState({userId: newUserId}, () => this.fetchProfileData())
    }
  }



  setTabIndex = index => {
    this.setState({tabIndex: index})
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Box component="main" maxWidth={935} margin="auto" padding="60px 20px 0">
          <Box mb="44px">
            {this.state.profileData ?
            <Grid container>
              <Grid item xs={4}>
                <Avatar
                className={classes.avatar}
                  style={{ margin: 'auto' }}
                  alt={this.state.profileData.full_name ? this.state.profileData.full_name : this.state.profileData.username}
                  src={this.state.profileData.user_profile_pic}
                />
              </Grid>
              <Grid item xs={8}>
                <Box clone mb="20px">
                  <Grid container alignItems="center">
                    <Typography component="h1" variant="h4" lightWeight>
                      {this.state.profileData.full_name ? this.state.profileData.full_name : this.state.profileData.username}
                    </Typography>
                  </Grid>
                </Box>
                <Box mb="20px">
                  <Grid container spacing={5}>
                    <Grid item>
                      <Typography variant="subtitle1">
                        <b>{this.state.profileData.tutorials.length != 0 ? this.state.profileData.tutorials.length : null}</b> posts
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                        <b>325</b> followers
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                        <b>260</b> following
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                {this.state.profileData.username ?
                  <Typography variant="subtitle1" bold>
                  @{this.state.profileData.username}
                  </Typography>
                  : null}
                <Typography variant="subtitle1">{this.state.profileData.intro}</Typography>
              </Grid>
            </Grid>
            : null}
          </Box>
          <Tabs
            value={this.state.tabIndex}
            centered
            onChange={(event, value) => {
              this.setTabIndex(value);
            }}
          >
            <Tab value="posts" label="Posts" icon={<MdGridOn />} />
            <Tab value="following" label="Following" icon={<Icon>live_tv</Icon>} />
            <Tab value="followers" label="Followers" icon={<Icon>bookmark_border_outlined</Icon>} />
          </Tabs>
          {this.state.tabIndex === "posts" && <TutorialList />}

          <Grid container spacing={4}>
            <Grid item xs={4}>
              <img
                alt="post"
                style={{ width: '100%' }}
                src="https://via.placeholder.com/500/f5f5f5"
              />
            </Grid>
            <Grid item xs={4}>
              <img
                alt="post"
                style={{ width: '100%' }}
                src="https://via.placeholder.com/500/f5f5f5"
              />
            </Grid>
            <Grid item xs={4}>
              <img
                alt="post"
                style={{ width: '100%' }}
                src="https://via.placeholder.com/500/f5f5f5"
              />
            </Grid>
            <Grid item xs={4}>
              <img
                alt="post"
                style={{ width: '100%' }}
                src="https://via.placeholder.com/500/f5f5f5"
              />
            </Grid>
            <Grid item xs={4}>
              <img
                alt="post"
                style={{ width: '100%' }}
                src="https://via.placeholder.com/500/f5f5f5"
              />
            </Grid>
            <Grid item xs={4}>
              <img
                alt="post"
                style={{ width: '100%' }}
                src="https://via.placeholder.com/500/f5f5f5"
              />
            </Grid>
            <Grid item xs={4}>
              <img
                alt="post"
                style={{ width: '100%' }}
                src="https://via.placeholder.com/500/f5f5f5"
              />
            </Grid>
            <Grid item xs={4}>
              <img
                alt="post"
                style={{ width: '100%' }}
                src="https://via.placeholder.com/500/f5f5f5"
              />
            </Grid>
            <Grid item xs={4}>
              <img
                alt="post"
                style={{ width: '100%' }}
                src="https://via.placeholder.com/500/f5f5f5"
              />
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    );
  }

}

export default withTheme(theme)(withStyles(styles)(withRouter(withErrorHandler(ProfilePage, axios, "list"))));
