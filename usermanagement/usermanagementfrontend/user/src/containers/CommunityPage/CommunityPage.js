import React from 'react'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from '../../user_axios'
import BasicMetaTags from '../../components/MetaTags/BasicMetaTags'
import TutorialList from '../TutorialList/TutorialList'
import CommunityMembers from '../../components/CommunityMembers/CommunityMembers'

const styles = theme => ({
  image: {
    width: theme.spacing(17)
  },
  communityMembers: {
    marginTop: theme.spacing(5)
  },
  name: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(7),
    },
  },
  subtitle: {
    color: 'grey',
    margin: theme.spacing()
  }
})

class CommunityPage extends React.Component {
  constructor(props) {
    super(props)
    const { communitySlug } = this.props.match.params;
    this.state = {
      communitySlug: communitySlug,
      loading: false,
      communityData: null
    }
  }

  fetchCommunityData = () => {
    axios.get(`/communities/${this.state.communitySlug}`)
    .then(response => {
      console.log(response.data);
      this.setState({
        communityData: response.data,
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
    this.fetchCommunityData()
  }

  render() {
    const { classes } = this.props;
    const heading = this.state.communityData ? (
      <Grid
        className={classes.heading}
        container
        direction="column"
        justify="center"
        alignItems="center">
        <img src={ this.state.communityData.profile_image } alt={this.state.communityData.name} className={classes.image} />
        <Typography variant="h1" component="h2" gutterBottom className={classes.name} align="center">
          { this.state.communityData.name }
        </Typography>

        <Typography variant="subtitle1" gutterBottom className={classes.subtitle} align="justify">
          { this.state.communityData.description }
        </Typography>
      </Grid>
    ) : null

    return (
      <>
        <BasicMetaTags
          title={this.state.communityData ? this.state.communityData.name : null}
        />
        {heading}

          <Grid container>
             <Grid item sm={9} xs={12}>
              <div className={classes.tutorialList}>
                <TutorialList myProfile={true} />
              </div>
            </Grid>
            <Grid item sm={3} xs={12} className={classes.communityMembers}>
              {this.state.communityData ?
                <CommunityMembers communityData={this.state.communityData} />
                : null}
            </Grid>
          </Grid>
      </>
    )
  }
}

export default withStyles(styles)(CommunityPage)
