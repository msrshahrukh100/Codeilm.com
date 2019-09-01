import React from 'react'
import ReactMarkdown from 'react-markdown'
import Embed from '../CarbonCode/embed'
import YouTube from 'react-youtube';
import './tutorialPage.css'
import Container from '@material-ui/core/Container';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  mainContent : {
    textAlign: 'justify',
    wordWrap: 'break-word',
    marginLeft: '8px',
    marginRight: '8px',
    fontSize: '21px',
    lineHeight: '32px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
      lineHeight: '30px',
    }
  }
});

const renderers: ReactMarkdown.Renderers = {
    code: (props: string) => {
      return (
        <Embed code={props.value} language={props.language} />
      )
    },
    image: props => {
      return <img {...props} className="tutorial-image" style={{marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '100%'}} />
    },
    heading: props => {
      return <Typography variant={"h"+props.level} component={"h"+props.level}>{props.children}</Typography>
    },
    link: (props) => {
      if(props.children[0].props.value === "YOUTUBE") {
        const opts = {
          playerVars: { // https://developers.google.com/youtube/player_parameters
            rel: 0,
            iv_load_policy: 3,
            loop: 1
          }
        };

        return (
          <div className="videoWrapper">
            <YouTube
              videoId={props.href}
              opts={opts}
              className={"something"}
            />
          </div>
        )
      }
      return (
        <a {...props} />
      )
    }
};

const tutorialPage = (props) => {
  const { classes } = props
  const title = props.page ? props.page.title : null
  const content = props.page ? <ReactMarkdown
    source={props.page.content}
    renderers={renderers} /> : null

  const widthConstraint = isWidthDown('sm', props.width)
  const shownContent = content ? content : props.lastPage
  let mainContent = null
  if (widthConstraint) {
    mainContent = shownContent
  }
  else {
    mainContent = <Container maxWidth="md">{shownContent}</Container>
  }
  return (
    <>
      <Typography gutterBottom variant="h4" component="h4">
      {title}
      </Typography>

      <div className={classes.mainContent}>
        {mainContent}
      </div>
    </>
  )
}

export default withWidth()(withStyles(styles)(tutorialPage))
