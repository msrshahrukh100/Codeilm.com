import React from 'react'
import { IoLogoBuffer } from "react-icons/io";
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import axios from '../../lovecodeaxios2'
import getCookie from '../../utils/getCookie'
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  iconSmall: {
    marginRight: theme.spacing.unit,
    fontSize: 20,
  },
  viewButton: {
    color: 'black',
    textTransform: 'none',
    marginLeft: theme.spacing.unit * 2
  }
});

class LikeButton extends React.Component {


  render() {
    const { classes } = this.props;
    const { tutorial } = this.props;
    return (
      <>
      {tutorial.view_data.views_count ?
        <Tooltip title="Views">
        <Button size="small" color="primary" className={classes.viewButton}>
        <IoLogoBuffer className={classes.iconSmall} />
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
