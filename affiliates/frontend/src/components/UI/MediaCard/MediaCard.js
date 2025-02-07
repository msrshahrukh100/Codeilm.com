import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    maxWidth: '100%',
    margin: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2),
    }
  },
  media: {
    height: 140,
  },
  actionBtn: {
    marginLeft: theme.spacing(2),
  },
  title: {
    marginLeft: 16,
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 30,
    },
  }
});

function MediaCard(props) {
  const { classes } = props;

  const cardContent = (
    <>
    {props.image ?
      <CardMedia
      className={classes.media}
      image="/static/images/cards/contemplative-reptile.jpg"
      title="Contemplative Reptile"
      />
    : null}

    <CardContent onClick={props.onClick}>
    {props.title ?
      <Typography className={classes.title} gutterBottom variant={props.headerVariant ? props.headerVariant : "h3"} component={props.headerComponent ? props.headerComponent : "h2"}>
      {props.title}
      </Typography>

      : null}
      <Typography component="div">
      {props.content}
      </Typography>
    </CardContent>
    </>
  )

  const linkedContent = props.onClick ? (
    <CardActionArea>
        {cardContent}
    </CardActionArea>
  ) : cardContent

  return (
    <Card className={classes.card} elevation={props.elevation}>
      {linkedContent}
      {props.actionButtons ?
        <CardActions className={classes.actionBtn}>
        {props.actionButtons}
        </CardActions>

        : null}
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
