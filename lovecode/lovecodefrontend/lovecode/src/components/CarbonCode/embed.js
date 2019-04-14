// Theirs
import React from 'react'
import url from 'url'
import morph from 'morphmorph'
import './Styles.css'

// Ours
import { StylesheetLink, CodeMirrorLink, MetaTags } from './components/Meta'
import Carbon from './components/Carbon'
import GistContainer from './components/GistContainer'
import { DEFAULT_CODE, DEFAULT_SETTINGS } from './lib/constants'
import { getQueryStringState } from './lib/routing'

const isInIFrame = morph.get('parent.window.parent')
const getParent = win => {
  const iFrame = isInIFrame(win)

  if (iFrame) {
    return iFrame
  }

  return win.parent
}

const Page = props => (
  <React.Fragment>

    <MetaTags />
    <StylesheetLink theme={props.theme} />
    <CodeMirrorLink />
    {props.children}
  </React.Fragment>
)

class Embed extends React.Component {
  state = {
    ...DEFAULT_SETTINGS,
    code: DEFAULT_CODE,
    mounted: false,
    readOnly: true
  }

  handleUpdate = updates => {
    const query = ""
    const queryParams = {
      backgroundColor: "rgba(255, 255, 255, 1)",
      dropShadow: true,
      dropShadowBlurRadius: "68px",
      dropShadowOffsetY: "20px",
      exportSize: "2x",
      fontFamily: "Hack",
      fontSize: "14px",
      language: "auto",
      lineHeight: "133%",
      lineNumbers: false,
      paddingHorizontal: "56px",
      paddingVertical: "56px",
      squaredImage: false,
      theme: "seti",
      watermark: false,
      widthAdjustment: true,
      windowControls: true,
      windowTheme: "none"
    }
    const initialState = Object.keys(queryParams).length ? queryParams : {}
    this.setState(
      {
        ...initialState,
        ...updates,
        id: query.id,
        copyable: queryParams.copy !== false,
        readOnly: queryParams.readonly !== false,
        mounted: true
      },
      this.postMessage
    )
  }

  ref = React.createRef()

  postMessage = () => {
    getParent(window).postMessage(
      JSON.stringify({
        // Used by embed provider
        src: window.location.toString(),
        context: 'iframe.resize',
        height: this.ref.current.offsetHeight
      }),
      '*'
    )
  }

  updateCode = code => {
    this.setState({ code }, this.postMessage)

    getParent(window).postMessage(
      {
        id: this.state.id ? `carbon:${this.state.id}` : 'carbon',
        code
      },
      '*'
    )
  }

  render() {
    return (
      <Page theme={this.state.theme}>
        <GistContainer onChange={this.handleUpdate} />
        {this.state.mounted && (
          <Carbon
            ref={this.ref}
            config={this.state}
            readOnly={this.state.readOnly}
            copyable={this.state.copyable}
            onChange={this.updateCode}
          >
            {this.state.code}
          </Carbon>
        )}
      </Page>
    )
  }
}

export default Embed
