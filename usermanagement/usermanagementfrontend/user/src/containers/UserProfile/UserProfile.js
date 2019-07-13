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
import getCookie from '../../utils/getCookie'
import Paper from '@material-ui/core/Paper';
import UserPaper from '../../components/UI/UserPaper/UserPaper'
import FollowUnfollow from '../FollowUnfollow/FollowUnfollow'
import ReactGA from 'react-ga';
import EditIntro from '../EditIntro/EditIntro'
import BasicMetaTags from '../../components/MetaTags/BasicMetaTags'
import { connect } from 'react-redux';


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
      height: theme.spacing(11),
      width: theme.spacing(11),
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
      intro: null,
      tabIndex: "posts",
      loading: false
    }
  }

  fetchProfileData = () => {
    axios.get(`/users/${this.state.userId}`)
    .then(response => {
      this.setState({
        profileData: response.data,
        intro: response.data.intro,
        loading: false
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

  handleIntroSave = () => {
    this.setState({loading: true})
    const putData = {
      intro: this.state.intro
    }
    const csrftoken = getCookie('csrftoken');

    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    axios.put(`/users/${this.state.userId}`, putData)
    .then(response => {
      this.setState({
        intro: response.data.intro,
        loading: false
      })
    })
    .catch(error => {
      this.setState({
        loading: false,
        error: error
      })
    })

  }

  componentDidUpdate(prevProps) {
    const newUserId = this.props.match.params.userId;
    const prevUserId = prevProps.match.params.userId;

    if(prevUserId !== newUserId) {
      this.setState({userId: newUserId, tabIndex: "posts"}, () => this.fetchProfileData())
    }

    if(this.props.user) {
      console.log(this.props.user.id);
      ReactGA.set({ userId: this.props.user.id });
    }
    if(this.props.user !== prevProps.user) {
      console.log("profile visit");
      ReactGA.event({
        category: 'User',
        action: "Visited profile page",
        label: 'VISITED_PROFILE_PAGE',
      });
      ReactGA.pageview(this.props.match.url);
    }

  }

  setTabIndex = index => {
    this.setState({tabIndex: index})
  }

  handleIntroChange = event => {
    this.setState({intro: event.target.value})
  }

  render() {
    const { classes } = this.props;
    const followers = this.state.profileData ? this.state.profileData.follower.map((value, index) => {
      return <UserPaper
        key={`follower_${index}`}
        showFollowUnfollowButton={this.props.user ? !(this.props.user.id === value.connection.user.id) : true}
        userId={value.connection.user.id}
        userName={value.connection.user.username}
        connection={value.connection_with_logged_in_user}
        name={value.connection.user.full_name ? value.connection.user.full_name : value.connection.user.username}
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
        showFollowUnfollowButton={this.props.user ? !(this.props.user.id === value.connection.following.id) : true}
        userId={value.connection.following.id}
        userName={value.connection.following.username}
        connection={value.connection_with_logged_in_user}
        name={value.connection.following.full_name ? value.connection.following.full_name : value.connection.following.username}
        intro={value.connection.following.intro}
        imageUrl={value.connection.following.user_profile_pic}
        />
    }) : null;
    const followingGrid = (
      <Grid container spacing={3}>
        {following}
      </Grid>
    )

    return (
      <React.Fragment>
      <BasicMetaTags
        title={this.state.profileData ? this.state.profileData.full_name : null}
      />
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
                    {!this.state.profileData.my_profile ?
                      <FollowUnfollow followingUserId={this.state.userId} connection={this.state.profileData.connection_with_logged_in_user} />
                      : null}
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
                <Typography variant="subtitle1">
                  {this.state.intro}
                </Typography>
                {this.state.profileData.my_profile ?
                  <EditIntro
                    loading={this.state.loading}
                    intro={this.state.intro}
                    handleIntroChange={this.handleIntroChange}
                    handleIntroSave={this.handleIntroSave} />
                  : null}
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
          <div style={this.state.tabIndex == "followers" ? {display: 'block'} : {display: 'none'}}>
            {followersGrid}
          </div>
          <div style={this.state.tabIndex == "following" ? {display: 'block'} : {display: 'none'}}>
            {followingGrid}
          </div>
        </Box>
      </React.Fragment>
    );
  }

}

const matchStateToProps = state => {
  return {
    user: state.aReducer.user
  }
}

export default withTheme(theme)(withStyles(styles)(withRouter(withErrorHandler(connect(matchStateToProps, null)(ProfilePage), axios, "linear"))));
