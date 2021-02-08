import React from 'react';
import { Redirect } from 'react-router';


function Randomizer(props) {
    
    

    if(!props.user) {
        return <Redirect to="/SignIn" />
    } else {
    return (
            <>
            <h2>Hello {props.user.email}</h2>
            </>
        );
    }
} 

export default Randomizer;