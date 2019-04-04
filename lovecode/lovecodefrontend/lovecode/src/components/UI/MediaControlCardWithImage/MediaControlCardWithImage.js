import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { Link } from 'react-router-dom'


const styles = theme => ({
  card: {
    display: 'flex',
    marginBottom: theme.spacing.unit + 20,
    marginLeft: theme.spacing.unit + 30,
    marginRight: theme.spacing.unit + 30,
    marginTop: theme.spacing.unit + 30,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    marginLeft: 'auto'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function MediaControlCardWithImage(props) {
  const { classes, theme } = props;
  console.log(props.data)
  const controls = (
    <div className={classes.controls}>
      <IconButton aria-label="Previous">
        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
      </IconButton>
      <IconButton aria-label="Play/pause">
        <PlayArrowIcon className={classes.playIcon} />
      </IconButton>
      <IconButton aria-label="Next">
        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
      </IconButton>
    </div>
  )

  let card = (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.data.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.data.subtitle}
          </Typography>
        </CardContent>
        <div className={classes.controls}>

        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={props.data.image}
        title={props.data.title}
      />
    </Card>
  );

  if(props.data.link) {
    card = <Link style={{ textDecoration: 'none' }} to={props.data.link}>{card}</Link>
  }

  return card
}

MediaControlCardWithImage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCardWithImage);
