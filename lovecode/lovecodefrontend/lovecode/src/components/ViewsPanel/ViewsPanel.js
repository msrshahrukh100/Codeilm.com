import React from 'react'
import { IoLogoBuffer } from "react-icons/io";
import { MdTrendingUp } from "react-icons/md";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import Tooltip from '@material-ui/core/Tooltip';


const styles = theme => ({
  iconSmall: {
    marginRight: theme.spacing(),
    fontSize: 20,
  },
  viewButton: {
    textTransform: 'none',
    marginLeft: theme.spacing(2)
  }
});

class LikeButton extends React.Component {


  render() {
    const { classes } = this.props;
    const { tutorial } = this.props;
    const { ownerIsAuthenticatedUser } = this.props;
    const icon = ownerIsAuthenticatedUser ?
      <IoLogoBuffer className={classes.iconSmall} /> :
      <MdTrendingUp className={classes.iconSmall} />
    return (
      <>
      {tutorial.view_data.views_count ?
        <Tooltip title={ownerIsAuthenticatedUser ? "See Metrics" : "Views"} aria-label={ownerIsAuthenticatedUser ? "See Metrics" : "Views"}>
        <Button
          onClick={ownerIsAuthenticatedUser ? this.props.onClickHandler : null}
          size="small"
          color="primary"
          style={ownerIsAuthenticatedUser ? null : {color: 'black'}}
          className={classes.viewButton}>
        {icon}
        <NumberFormat
        value={tutorial.view_data.views_count}
        displayType={'text'}
        thousandSeparator={true}
        renderText={value => <>{value !== "0" && value !== "" ? value : ""}</>} />
        </Button>
        </Tooltip>
        : null}
      </>
    )
  }
}

export default withStyles(styles)(LikeButton)
