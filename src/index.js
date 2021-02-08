import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from 'axios';


axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

ReactDOM.render(<App />, document.getElementById("root"));
