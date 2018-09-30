import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import Aux from '../../../hoc/Aux/Aux'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  languageIcon: {
    paddingLeft: '15px',
    color: 'red',
  }
})

class LanguageIcon extends React.Component {

  iconForLanguage = (language) => {
    const { classes } = this.props
    let icon = null
    const title = "This repo is built using " + language
    switch (language) {
      case "JavaScript":
        icon = "devicon-javascript-plain colored "
        break;
      case "Python":
        icon = "devicon-python-plain colored "
        break;
      case "CSS":
        icon = "devicon-css3-plain colored "
        break;
      case "HTML":
        icon = "devicon-html5-plain colored "
        break;
      case "Vim script":
        icon = "devicon-vim-plain colored "
        break;
      case "Dockerfile":
        icon = "devicon-docker-plain colored "
        break;
      case "Jupyter Notebook":
        icon = "devicon-python-plain"
        break;
      case "Ruby":
        icon = "devicon-ruby-plain colored "
        break;
      case "C++":
        icon = "devicon-cplusplus-plain colored "
        break;
      case "C":
        icon = "devicon-c-plain colored "
        break;
      case "Shell":
        icon = "devicon-ssh-plain colored "
        break;
      case "Makefile":
        icon = "devicon-sequelize-plain colored "
        break;
      default:
        icon = "devicon-chrome-plain "
    }
    return (
      <Tooltip title={title}>
        <i style={{fontSize: '20px'}} className={icon + classes.languageIcon} ></i>
      </Tooltip>
    )
  }

  render() {

    const languages = Object.keys(this.props.languages)
    const languageIcons = languages.map(language => {
      const icon = this.iconForLanguage(language)
      return <Aux key={language}>{icon}</Aux>
    })
    return (
      <Aux>
        {languageIcons}
      </Aux>
    )
  }
}

export default withStyles(styles)(LanguageIcon)
