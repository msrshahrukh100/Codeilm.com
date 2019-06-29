import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { MdGridOn, MdPersonAdd, MdPeople } from "react-icons/md";
import TutorialList from '../TutorialList/TutorialList'
import withTheme from './withTheme';
import theme from './theme';
import atoms from './atoms';
import molecules from './molecules';
import axios from '../../user_axios'
import Paper from '@material-ui/core/Paper';
import UserPaper from '../../components/UI/UserPaper/UserPaper'
import FollowUnfollow from '../FollowUnfollow/FollowUnfollow'

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
      height: theme.spacing(13),
      width: theme.spacing(13),
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
      profileData: null,
      tabIndex: "posts"
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
    const followers = this.state.profileData ? this.state.profileData.follower.map((value, index) => {
      return <UserPaper
        key={`follower_${index}`}
        userId={value.connection.user.id}
        connection={value.connection_with_logged_in_user}
        name={value.connection.user.full_name}
        intro={value.connection.user.intro}
        imageUrl={value.connection.user.user_profile_pic} />
    }) : null;
    const followersGrid = (
      <Grid container spacing={3}>
        {followers}
      </Grid>
    )

    const following = this.state.profileData ? this.state.profileData.following.map((value, index) => {
      return <UserPaper
        key={`following_${index}`}
        userId={value.connection.following.id}
        connection={value.connection_with_logged_in_user}
        name={value.connection.following.full_name}
        intro={value.connection.following.intro}
        imageUrl={value.connection.following.user_profile_pic}
        />
    }) : null;
    const followingGrid = (
      <Grid container spacing={3}>
        {following}
      </Grid>
    )

    console.log(this.state);
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
                    <FollowUnfollow followingUserId={this.state.userId} connection={this.state.profileData.connection_with_logged_in_user} />
                  </Grid>
                </Box>
                <Box mb="20px">
                  <Grid container spacing={5}>
                    <Grid item>
                      <Typography variant="subtitle1">
                      {this.state.profileData.tutorial_count != "0"
                        ? <span><b>{this.state.profileData.tutorial_count}</b> post{this.state.profileData.tutorial_count != "1" ? "s" : ""}</span>
                        : null}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                        {this.state.profileData.follower.length ?
                          <><b>{this.state.profileData.follower.length }</b> follower{this.state.profileData.follower.length > 1 ? "s" : "" }</>
                          : null}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                      {this.state.profileData.following.length ?
                        <><b>{this.state.profileData.following.length }</b> following</>
                        : null}
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
            <Tab value="following" label="Following" icon={<MdPersonAdd />} />
            <Tab value="followers" label="Followers" icon={<MdPeople />} />
          </Tabs>
          <div style={this.state.tabIndex == "posts" ? {display: 'block'} : {display: 'none'}}>
            <TutorialList/>
          </div>
          {this.state.tabIndex == "followers" ? followersGrid : null}
          {this.state.tabIndex == "following" ? followingGrid : null}
        </Box>
      </React.Fragment>
    );
  }

}

export default withTheme(theme)(withStyles(styles)(withRouter(withErrorHandler(ProfilePage, axios))));
