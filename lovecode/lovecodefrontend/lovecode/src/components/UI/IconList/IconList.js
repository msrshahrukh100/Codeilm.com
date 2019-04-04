import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
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
  InboxIcon: <InboxIcon />,
  MailIcon: <MailIcon />,
  HomeIcon: <HomeIcon />,
  FitnessCenterIcon: <FitnessCenterIcon />

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
