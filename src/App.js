import './App.css';
import React from "react";
import Main from './components/Main';
import { BrowserRouter as Router } from 'react-router-dom';

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


