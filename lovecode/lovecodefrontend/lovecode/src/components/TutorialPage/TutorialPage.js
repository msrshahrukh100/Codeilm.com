import React from 'react'
import ReactMarkdown from 'react-markdown'
import Embed from '../CarbonCode/embed'
import YouTube from 'react-youtube';
import './tutorialPage.css'
import Container from '@material-ui/core/Container';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';


const renderers: ReactMarkdown.Renderers = {
    code: (props: string) => {
      return (
        <Embed code={props.value} language={props.language} />
      )
    },
    paragraph: (props) => {
      return <p className="paddedText" {...props}/>
    },
    list: (props) => {
      if(props.ordered) {

        return <ol className="paddedText" {...props} ordered="true" tight="true" />
      }
      else {
        return <ul className="paddedText" {...props} tight="true" />
      }
    },
    image: props => {
      return <img {...props} className="tutorial-image" style={{marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '100%'}} />
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
  const title = props.page ? props.page.title : null
  const content = props.page ? <ReactMarkdown
    source={props.page.content}
    renderers={renderers} /> : null

  const widthConstraint = isWidthDown('sm', props.width)
  const shownContent = content ? content : props.lastPage
  const mainContent = props.stepsLength > 1 || widthConstraint ? shownContent :  <Container maxWidth="md">{shownContent}</Container>
  return (
    <>
      <h2>{title}</h2>
      {mainContent}
    </>
  )
}

export default withWidth()(tutorialPage)
