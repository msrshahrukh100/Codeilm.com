import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    height: theme.spacing(3),
    fontSize: theme.spacing(1.5),
    marginRight: theme.spacing(0.4)
  }

});

function handleDelete() {
  alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick(event, props) {
  event.stopPropagation();
  props.history.push(props.link);
}

function Chips(props) {
  const { classes, chipsData } = props;
  const otherTypes = (
    <>
    <Chip label="Basic Chip" className={classes.chip} variant="outlined" />
    <Chip
      avatar={<Avatar>MB</Avatar>}
      label="Clickable Chip"
      onClick={handleClick}
      className={classes.chip}
      variant="outlined"
    />
    <Chip
      avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
      label="Deletable Chip"
      onDelete={handleDelete}
      className={classes.chip}
      variant="outlined"
    />
    <Chip
      avatar={
        <Avatar>
          <FaceIcon />
        </Avatar>
      }
      label="Clickable Deletable Chip"
      onClick={handleClick}
      onDelete={handleDelete}
      className={classes.chip}
      variant="outlined"
    />
    <Chip
      icon={<FaceIcon />}
      label="Clickable Deletable Chip"
      onClick={handleClick}
      onDelete={handleDelete}
      className={classes.chip}
      variant="outlined"
    />
    <Chip
      label="Custom delete icon Chip"
      onClick={handleClick}
      onDelete={handleDelete}
      className={classes.chip}
      deleteIcon={<DoneIcon />}
      variant="outlined"
    />
    <Chip
      label="Clickable Link Chip"
      className={classes.chip}
      component="a"
      href="#chip"
      clickable
      variant="outlined"
    />
    <Chip
      avatar={<Avatar>MB</Avatar>}
      label="Primary Clickable Chip"
      clickable
      className={classes.chip}
      color="primary"
      onDelete={handleDelete}
      deleteIcon={<DoneIcon />}
      variant="outlined"
    />
    <Chip
      icon={<FaceIcon />}
      label="Primary Clickable Chip"
      clickable
      className={classes.chip}
      color="primary"
      onDelete={handleDelete}
      deleteIcon={<DoneIcon />}
      variant="outlined"
    />
    <Chip
      label="Deletable Primary Chip"
      onDelete={handleDelete}
      className={classes.chip}
      color="primary"
      variant="outlined"
    />
    <Chip
      avatar={
        <Avatar>
          <FaceIcon />
        </Avatar>
      }
      label="Deletable Secondary Chip"
      onDelete={handleDelete}
      className={classes.chip}
      color="secondary"
      variant="outlined"
    />
    <Chip
      icon={<FaceIcon />}
      label="Deletable Secondary Chip"
      onDelete={handleDelete}
      className={classes.chip}
      color="secondary"
      variant="outlined"
    />
    </>
  )
  const chip = (
    chipsData.image ?
      <Chip
      avatar={<Avatar alt={chipsData.text} src={chipsData.image} />}
      label={chipsData.text}
      className={classes.chip}
      variant="outlined"
      />
      : <Chip
      label={chipsData.text}
      clickable
      onClick={(event) => handleClick(event, props)}
      className={classes.chip}
      variant="outlined"
      />
  )
  return (
    <>
    {chip}
    </>
  );
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Chips));
