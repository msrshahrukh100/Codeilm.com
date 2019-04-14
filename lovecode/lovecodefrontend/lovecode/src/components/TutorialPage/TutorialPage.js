import React from 'react'
import ReactMarkdown from 'react-markdown'
import Embed from '../CarbonCode/embed'

const tutorialPage = (props) => {
  const title = props.page ? props.page.title : null
  const content = props.page ?
    props.page.content.map((segment, index) => {
      if(segment.type == "md") {
        return <ReactMarkdown key={"markdown" + index} source={segment.value} />
      }
    }) : null


  return (
    <>
      <h1>{title}</h1>
      <Embed />
      {content}
    </>
  )
}

export default tutorialPage
