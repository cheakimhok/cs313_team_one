import './App.css';
import React from "react";
import Main from './components/Main';
import BasicCal from './components/basicCal/component/App'
import { BrowserRouter as Router } from 'react-router-dom';

import { render } from '@testing-library/react';

export default class App extends React.Component {
  render(){
    return (
        <Router>
            <div className='App'>
                <Main />
            </div>
        </Router>
    );
  }
}


