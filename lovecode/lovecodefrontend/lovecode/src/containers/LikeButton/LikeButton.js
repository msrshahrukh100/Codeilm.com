import React from 'react'
import { MdThumbUp } from "react-icons/md";
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import axios from '../../lovecodeaxios2'
import getCookie from '../../utils/getCookie'
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import ReactGA from 'react-ga';

const styles = theme => ({
  iconSmall: {
    marginRight: theme.spacing(),
    fontSize: 20,
  },
  avatar: {
    margin: 3,
    width: 25,
     height: 25
  },
  likeButton: {
    textTransform: 'none',
    marginLeft: theme.spacing()
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
    ReactGA.modalview(`liked ${this.state.tutorialId}`);

    ReactGA.event({
      category: 'User',
      action: 'Clicked like button',
      label: 'LIKE_BUTTON_CLICKED',
      value: !this.state.liked ? 1 : 0
    });

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
      // this.setState({
      //   error: error,
      //   loading: false
      // })
    })
  }

  render() {
    const { classes } = this.props;
    const btnClasses = this.state.liked ? [classes.likeButton] : [classes.likeButton, classes.notLiked]

    const avatars = this.state.likeUsers ?
      this.state.likeUsers.map(user => {
        return (<Tooltip
              key={user.id}
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
      <Tooltip title={this.state.likeCount ? "Likes" : "Like this"}>
      <Button disabled={this.state.loading} size="small" color="primary" className={clsx(btnClasses)} onClick={this.likeHandler}>
        <MdThumbUp className={classes.iconSmall} />
        <NumberFormat
          value={this.state.likeCount}
          displayType={'text'}
          thousandSeparator={true}
          renderText={value => <>{value !== "0" && value !== "" ? value : "Like this"}</>} />
      </Button>
      </Tooltip>
      {avatars}
      </>
    )
  }
}

export default withStyles(styles)(withErrorHandler(LikeButton, axios))
