import React from 'react'
import { FaPython } from 'react-icons/fa';
import Tooltip from '@material-ui/core/Tooltip';


const tutorialInfo = (props) => {
  return <Tooltip title="Uses Python"><FaPython /></Tooltip>
}

export default tutorialInfo
