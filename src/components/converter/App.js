import React, { Component } from 'react';

import './App.css';
import Nav from './Nav'




export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            repos: [],
            activeConverter: 'length',
        }
        this.handleSelectConverter = this.handleSelectConverter.bind(this);
    }
    handleSelectConverter(con) {
        this.setState({
            activeConverter: con
        })
    }
    render() {
        return (
            <>
                <Nav onSelectConverter={this.handleSelectConverter} />

                <h2>ActiveConverter: {this.state.activeConverter}</h2>
            </>
        );
    }
};
