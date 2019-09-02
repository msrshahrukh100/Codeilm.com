import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from '../../projects_axios'
import MediaCard from '../../components/UI/MediaCard/MediaCard'
import Grid from '@material-ui/core/Grid';
import CoolButton from '../../components/UI/CoolButton/CoolButton'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class ProjectsList extends React.Component {

  state = {
    userProjects: [],
    allProjects: [],
    activeTab: 0
  }

  changeTab = value => {
    this.setState({
      activeTab: value
    })
  }

  fetchProjects = () => {

    axios.get(`/`)
      .then(response => {
        const data = response.data;
        this.setState({
          userProjects: data.user_projects,
          allProjects: data.all_projects
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: error,
          loading: false
        })
      })
  }

  componentDidMount() {
    this.fetchProjects()
  }

  render() {
    const { classes } = this.props;

    return (
      <>
      <Paper className={classes.root}>
        <Tabs
          value={this.state.activeTab}
          onChange={this.changeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
          elevation={0}
        >
          <Tab onClick={() => this.changeTab(0)} label="Your Projects" style={{textTransform: 'none'}} />
          <Tab onClick={() => this.changeTab(1)} label="All Projects" style={{textTransform: 'none'}} />
        </Tabs>
      </Paper>
      <Grid container style={this.state.activeTab == 0 ? null :  {display: 'none'}}>
      {this.state.userProjects.map(value => (
        <Grid item sm={4}>
          <MediaCard key={value.id} title={value.title} onClick={() => this.props.history.push(`/p/${value.id}`)} />
        </Grid>
      )
      )}
      </Grid>

      <Grid container style={this.state.activeTab == 1 ? null :  {display: 'none'}}>
      {this.state.allProjects.map(value => (
        <Grid item sm={4}>
          <MediaCard key={value.id} title={value.title} onClick={() => this.props.history.push(`/p/${value.id}`)} />
        </Grid>
      )
      )}
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ marginTop: 10 }}
      >
        <Grid item xs={6}>
          <CoolButton text="Add a new Project" link="/projects/create"/>
        </Grid>

      </Grid>
      </>
    );
  }

}


export default withStyles(styles)(ProjectsList);
