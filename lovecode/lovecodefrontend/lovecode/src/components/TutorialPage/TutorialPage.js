import React from 'react'
import ReactMarkdown from 'react-markdown'

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
      {content}
    </>
  )
}

export default tutorialPage
