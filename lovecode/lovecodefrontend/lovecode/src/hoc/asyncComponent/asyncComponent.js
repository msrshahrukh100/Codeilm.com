import React, { Component } from 'react';
import CircularPreloader from '../../components/UI/CircularPreloader/CircularPreloader'

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount () {
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }

        render () {
            const C = this.state.component;

            return C ? <C {...this.props} /> : <CircularPreloader />;
        }
    }
}

export default asyncComponent;
