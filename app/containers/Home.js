import React from 'react';
import { push } from 'react-router-redux'
import {connect} from 'react-redux';

@connect(state=>({
    toute: state.routing
}),{
    push
})
export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                hello word
                <a onClick={()=>{
                    this.props.push("/about")
                }}> haha </a>
            </div>
        )
    }
}