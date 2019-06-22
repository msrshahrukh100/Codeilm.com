import React from 'react'
import { MdShare } from "react-icons/md";
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import './share.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  FacebookShareCount,
  RedditShareCount,

  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,

  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  EmailIcon,
} from 'react-share';

const styles = theme => ({
  iconSmall: {
    marginRight: theme.spacing(),
    fontSize: 20,
  },
  likeButton: {
    textTransform: 'none',
    marginLeft: theme.spacing()
  },
  notLiked: {
    color: 'black'
  },

});

class ShareButton extends React.Component {

  state = {
    open: false
  }


  shareHandler = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    const { classes } = this.props;
    const { title } = this.props;
    const { url } = this.props;
    const btnClasses = this.state.liked ? [classes.likeButton] : [classes.likeButton, classes.notLiked]

    return (
      <>
      <Tooltip title="Share">
      <Button size="small" color="primary" className={clsx(btnClasses)} onClick={() => this.setState({open: true})}>
        <MdShare className={classes.iconSmall} />
      </Button>
      </Tooltip>

      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText component="div" id="alert-dialog-description">
            Share on
            <div className="Demo__container">
             <div className="Demo__some-network">
               <FacebookShareButton
                 url={url}
                 quote={title}
                 className="Demo__some-network__share-button">
                 <FacebookIcon
                   size={32}
                   round />
               </FacebookShareButton>

               <FacebookShareCount
                 url={url}
                 className="Demo__some-network__share-count">
                 {count => count}
               </FacebookShareCount>
             </div>

             <div className="Demo__some-network">
               <TwitterShareButton
                 url={url}
                 title={title}
                 className="Demo__some-network__share-button">
                 <TwitterIcon
                   size={32}
                   round />
               </TwitterShareButton>

               <div className="Demo__some-network__share-count">
                 &nbsp;
               </div>
             </div>

             <div className="Demo__some-network">
               <TelegramShareButton
                 url={url}
                 title={title}
                 className="Demo__some-network__share-button">
                 <TelegramIcon size={32} round />
               </TelegramShareButton>

               <div className="Demo__some-network__share-count">
                 &nbsp;
               </div>
             </div>

             <div className="Demo__some-network">
               <WhatsappShareButton
                 url={url}
                 title={title}
                 separator=":: "
                 className="Demo__some-network__share-button">
                 <WhatsappIcon size={32} round />
               </WhatsappShareButton>

               <div className="Demo__some-network__share-count">
                 &nbsp;
               </div>
             </div>

             <div className="Demo__some-network">
               <LinkedinShareButton
                 url={url}
                 windowWidth={750}
                 windowHeight={600}
                 className="Demo__some-network__share-button">
                 <LinkedinIcon
                   size={32}
                   round />
               </LinkedinShareButton>
             </div>
             <div className="Demo__some-network">
               <RedditShareButton
                 url={url}
                 title={title}
                 windowWidth={660}
                 windowHeight={460}
                 className="Demo__some-network__share-button">
                 <RedditIcon
                   size={32}
                   round />
               </RedditShareButton>

               <RedditShareCount url={url}
                 className="Demo__some-network__share-count" />
             </div>


             <div className="Demo__some-network">
               <EmailShareButton
                 url={url}
                 subject={title}
                 body="body"
                 className="Demo__some-network__share-button">
                 <EmailIcon
                   size={32}
                   round />
               </EmailShareButton>
             </div>
           </div>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </>
    )
  }
}

export default withStyles(styles)(ShareButton)
