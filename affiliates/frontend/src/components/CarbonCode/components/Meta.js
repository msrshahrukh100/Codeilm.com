import React from 'react'
import { THEMES, THEMES_HASH } from '../lib/constants'
import Reset from './style/Reset'
import Font from './style/Font'
import Typography from './style/Typography'

const LOCAL_STYLESHEETS = ['one-light', 'one-dark', 'verminal', 'night-owl', 'nord']
const CDN_STYLESHEETS = THEMES.filter(t => LOCAL_STYLESHEETS.indexOf(t.id) < 0)

export function Link({ href }) {
  return (
    <>
      <link rel="preload" as="style" href={href} />
      <link rel="stylesheet" href={href} />
    </>
  )
}

export const StylesheetLink = ({ theme }) => {
  let href
  if (LOCAL_STYLESHEETS.indexOf(theme) > -1) {
    href = `/static/themes/${theme}.css`
  } else {
    const themeDef = THEMES_HASH[theme]
    href = `//cdnjs.cloudflare.com/ajax/libs/codemirror/5.42.2/theme/${themeDef &&
      (themeDef.link || themeDef.id)}.min.css`
  }

  return <Link href={href} />
}

export const CodeMirrorLink = () => (
  <Link href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.42.2/codemirror.min.css" />
)

const title = 'Carbon'
const description =
  'Carbon is the easiest way to create and share beautiful images of your source code.'
export const MetaTags = React.memo(() => (
  <>
  </>
))

export const MetaLinks = React.memo(() => {
  return (
    <React.Fragment>
      <Link href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.42.2/theme/seti.min.css" />
      <CodeMirrorLink />
      {LOCAL_STYLESHEETS.map(id => (
        <Link key={id} href={`/static/themes/${id}.css`} />
      ))}
      {CDN_STYLESHEETS.map(themeDef => {
        const href = `//cdnjs.cloudflare.com/ajax/libs/codemirror/5.42.2/theme/${themeDef &&
          (themeDef.link || themeDef.id)}.min.css`
        return <Link key={themeDef.id} href={href} />
      })}
    </React.Fragment>
  )
})

export default React.memo(function Meta() {
  return (
    <React.Fragment>
      <MetaTags />
      <Reset />
      <Font />
      <Typography />
    </React.Fragment>
  )
})
