import React from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux';

@connect(state => ({
    toute: state.routing
}), {
    push
})
export default class About extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                关于
            </div>
        )
    }
}