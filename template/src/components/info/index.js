/**
 * Created by pomy on 08/02/2017.
 */

'use strict';

import React, {Component, PropTypes} from 'react';

export  default  class Info extends Component{
    constructor (){
        super();
    }

    static propTypes = {
        info: PropTypes.string
    };

    static defaultProps = {
        info: 'project info:'
    };

    render(){
        return (
            <div className="info">
                <h2>{this.props.info}</h2>
                <h3>Project Name:client</h3>
                <h3>Project Version:1.0.0</h3>
                <h3>Author:ximing</h3>
                <h3>Desc: A new React project</h3>
            </div>
        )
    }
}