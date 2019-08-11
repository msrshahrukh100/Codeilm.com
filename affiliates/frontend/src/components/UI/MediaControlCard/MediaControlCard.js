import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom'
import Chips from '../Chips/Chips'

const styles = theme => ({
  card: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function MediaControlCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <div>
        <CardContent className={classes.content}>

          <Link to={{
            pathname: props.link,
            search: props.search,
          }} >
            <Tooltip title={props.tooltiptitle} aria-label={props.tooltiptitle} placement={props.tooltipplacement}>
                <IconButton aria-label="Play/pause" style={{ float: "right" }}>
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
            </Tooltip>
          </Link>

          <Typography component="h5" variant="h5">
            {props.name}
          </Typography>

          <Typography variant="subtitle1" color="textSecondary">
            {props.extraText}
          </Typography>
          {props.chipsData ? <Chips chipsData={props.chipsData} /> : null}



        </CardContent>

      </div>
    </Card>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  tooltiptitle: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
