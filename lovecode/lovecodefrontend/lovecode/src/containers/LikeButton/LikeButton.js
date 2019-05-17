import React from 'react'
import { MdThumbUp } from "react-icons/md";
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import axios from '../../lovecodeaxios2'
import getCookie from '../../utils/getCookie'

const styles = theme => ({
  iconSmall: {
    marginRight: theme.spacing.unit,
    fontSize: 20,
  },
  likeButton: {
    textTransform: 'none',
  },
  notLiked: {
    color: 'black'
  }

});

class LikeButton extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      liked: this.props.tutorial ? this.props.tutorial.liked_by_authenticated_user : false,
      tutorialId: this.props.tutorial ? this.props.tutorial.id : null,
      likeCount: this.props.tutorial ? this.props.tutorial.like_data.count : 0
    }
  }

  likeHandler = () => {
    const csrftoken = getCookie('csrftoken');
    const postData = {
      liked: !this.state.liked,
      tutorial_id: this.state.tutorialId
    };
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    axios.post('/tutorials/like', postData)
    .then(response => {
      this.setState({
        liked: response.data.like_data.liked,
        likeCount: response.data.tutorial_like_data.count
      })
    })
    .catch(error => {
      console.log(error);
      this.setState({
        error: error
      })
    })
  }

  render() {
    const { classes } = this.props;
    const { tutorial } = this.props;
    const btnClasses = this.state.liked ? [classes.likeButton] : [classes.likeButton, classes.notLiked]

    return (
      <Button size="small" color="primary" className={classNames(btnClasses)} onClick={this.likeHandler}>
        <MdThumbUp className={classes.iconSmall} />
        <NumberFormat
          value={this.state.likeCount}
          displayType={'text'}
          thousandSeparator={true}
          renderText={value => <>{value !== "0" && value !== "" ? value + " people like this" : "Like this"}</>} />
      </Button>
    )
  }
}

export default withStyles(styles)(LikeButton)
