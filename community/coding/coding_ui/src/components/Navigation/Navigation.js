import React from 'react'
import NavBar from './NavBar/NavBar'
import DrawerSection from './DrawerSection/DrawerSection'
import Aux from '../../hoc/Aux/Aux'


class Navigation extends React.Component {

  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Aux>
        <NavBar
          opened={this.state.open}
          onDrawerOpen={this.handleDrawerOpen} />
        <DrawerSection
          opened={this.state.open}
          onDrawerClose={this.handleDrawerClose} />
      </Aux>
    )
  }
}

export default Navigation;
