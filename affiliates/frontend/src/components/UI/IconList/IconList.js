import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import CreateIcon from '@material-ui/icons/Create';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'


const styles = {
  list: {
    width: 250,
  }
};

const iconMap = {
  All: <ArrowForwardIosIcon />,
  Create: <CreateIcon />,
  HomeIcon: <HomeIcon />,
  FitnessCenterIcon: <FitnessCenterIcon />,
  LogOut: <PowerSettingsNewIcon />
}


const iconList = (props) => {
  const { classes, listitems } = props;
  const list = (
    <div className={classes.list}>
      <List>
        {listitems.map((value, index) => (
          <Link to={value.link} key={value.key} style={{textDecoration: 'None'}}>
            <ListItem button>
              <ListItemIcon>
                { iconMap[value.icon] }
              </ListItemIcon>
              <ListItemText primary={value.text} />
            </ListItem>
            </Link>
        ))}
      </List>
      <Divider />
    </div>
  );

  return list
}

export default withStyles(styles)(iconList)
