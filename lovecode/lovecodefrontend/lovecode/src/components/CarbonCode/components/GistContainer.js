import React from 'react'
import url from 'url'

import { escapeHtml } from '../lib/util'
import ApiContext from './ApiContext'

class GistContainer extends React.Component {
  static contextType = ApiContext

  async componentDidMount() {

    let newState = {}
    this.props.onChange(newState)
  }

  render() {
    return null
  }
}

export default GistContainer
