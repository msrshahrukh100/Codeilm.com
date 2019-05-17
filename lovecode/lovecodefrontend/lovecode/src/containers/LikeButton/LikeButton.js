import React from 'react'
import { MdThumbUp } from "react-icons/md";
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
  avatar: {
    margin: 3,
    width: 25,
     height: 25
  },
  likeButton: {
    textTransform: 'none',
  },
  notLiked: {
    color: 'black'
  },
  htmlTooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    '& b': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    opacity: 1,
  }

});

class LikeButton extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      liked: this.props.tutorial ? this.props.tutorial.liked_by_authenticated_user : false,
      tutorialId: this.props.tutorial ? this.props.tutorial.id : null,
      likeCount: this.props.tutorial ? this.props.tutorial.like_data.count : 0,
      likeUsers: this.props.tutorial ? this.props.tutorial.like_data ? this.props.tutorial.like_data.like_users : [] : [],
      loading: false
    }
  }

  likeHandler = () => {
    this.setState({loading: true})
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
        likeCount: response.data.tutorial_like_data.count,
        likeUsers: response.data.tutorial_like_data.like_users,
        loading: false
      })
    })
    .catch(error => {
      console.log(error);
      this.setState({
        error: error,
        loading: false
      })
    })
  }

  render() {
    const { classes } = this.props;
    const { tutorial } = this.props;
    const btnClasses = this.state.liked ? [classes.likeButton] : [classes.likeButton, classes.notLiked]

    const avatars = this.state.likeUsers ?
      this.state.likeUsers.map(user => {
        return (<Tooltip
              classes={{
                tooltip: classes.htmlTooltip,
              }}
              title={
                <>
                  <div>
                    <h4>{user.user.full_name}</h4>
                    <p style={{color: 'grey'}}>{user.user.intro}</p>
                    </div>
                </>
              }
            >
              <Avatar key={user.id} alt={user.user.full_name} src={user.user.user_profile_pic} className={classes.avatar} />
            </Tooltip>)
      })
      : null;

    return (
      <>
      <Button disabled={this.state.loading} size="small" color="primary" className={classNames(btnClasses)} onClick={this.likeHandler}>
        <MdThumbUp className={classes.iconSmall} />
        <NumberFormat
          value={this.state.likeCount}
          displayType={'text'}
          thousandSeparator={true}
          renderText={value => <>{value !== "0" && value !== "" ? value + " people like this" : "Like this"}</>} />
      </Button>
      {avatars}
      </>
    )
  }
}

export default withStyles(styles)(LikeButton)
