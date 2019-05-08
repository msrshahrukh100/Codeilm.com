import React from 'react'
import ReactMarkdown from 'react-markdown'
import Embed from '../CarbonCode/embed'

const renderers: ReactMarkdown.Renderers = {
    code: (props: string) => {
      console.log(props);
      return (
        <Embed code={props.value} language="python" />
      )
    }
};

const tutorialPage = (props) => {
  const title = props.page ? props.page.title : null
  const content = props.page ? <ReactMarkdown
    source={props.page.content}
    renderers={renderers} /> : null


  return (
    <>
      <h1>{title}</h1>
      {content}
    </>
  )
}

export default tutorialPage
