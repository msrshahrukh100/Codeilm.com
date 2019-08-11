import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  padding: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }

}));

function getElement(item) {
  return (
    <React.Fragment key={item.id}>
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Link to={`/u/${item.username}-${item.id}`}>
            <Avatar alt={item.full_name} src={item.user_profile_pic} />
          </Link>
        </ListItemAvatar>
        <Link style={{textDecoration: 'none', color: 'black'}} to={`/u/${item.username}-${item.id}`}>
          <ListItemText
            primary={item.full_name}
            secondary={item.intro}
          />
        </Link>
    </ListItem>
    <Divider variant="inset" component="li" />
    </React.Fragment>
  )
}

export default function AlignItemsList(props) {
  const classes = useStyles();
  const members = props.communityData.members
  const admins = props.communityData.admins
  const adminElements = admins.map(item => {
    return getElement(item)
  })

  const memberElements = members.map(item => {
    return getElement(item)
  })

  return (
    <>
    {admins.length !== 0 ?
      <List className={classes.root} dense={true} subheader={<b>Admins</b>}>
        {adminElements}
      </List>
      : null}
    <div className={classes.padding}>
    </div>

    {members.length !== 0 ?
      <List className={classes.root} dense={true} subheader={<b>Members</b>}>
        {memberElements}
      </List>
      : null}
    </>
  );
}
