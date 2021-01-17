import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = () => {
    return (
        <>
            <nav id='header' class='navbar navbar-shadow'>
                <span class='navbar-brand h1'><AiOutlineMenu id = 'navbar-icon' />Smai Tmey</span>
            </nav>
        </>
    );
};

export default Header;
