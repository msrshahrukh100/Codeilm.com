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
  const content = props.page ?
    props.page.content.map((segment, index) => {
      if(segment.type == "md") {
        return <ReactMarkdown
          key={"markdown" + index}
          source={segment.value}
          renderers={renderers} />
      }
      else if(segment.type == "code") {
        return <Embed key={"code"+index} code={segment.value} language="python" />
      }
    }) : null


  return (
    <>
      <h1>{title}</h1>
      {content}
    </>
  )
}

export default tutorialPage
