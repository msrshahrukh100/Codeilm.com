import React from 'react'
import {Helmet} from "react-helmet";


const basicMetaTags = (props) => {
  const { title = "Codeilm" } = props
  const { description = "Codeilm is the online community for developers to Share, Inspire & Teach, how they build their Projects, in the form of Tutorials using Markdown." } = props
  const { canonicalUrl = "https://codeilm.com" } = props

  return (
    <Helmet
      titleTemplate="%s | Codeilm"
      defaultTitle="Codeilm"
    >

    <title itemProp="name" lang="en">{ title }</title>
    <meta name="description" content={ description } />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={ title } />
    <meta property="og:description" content={ description } />
    <meta property="og:url" content={ canonicalUrl } />
    <meta property="og:image" content="http://mysite.com/img/apple-touch-icon-57x57.png" />

    <link rel="canonical" href={ canonicalUrl } />

    <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />


</Helmet>
  )
}

export default basicMetaTags
