import React from 'react';
import {connect} from 'react-redux';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
    
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
