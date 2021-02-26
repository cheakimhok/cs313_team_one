import { useCallback, useLayoutEffect } from 'react';
import { Container, Col, Row, ListGroup, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css';

const Nav = (props) => {
    const navMenu = [
        'Random Picker',
        'Custom List',
        'Decision Maker',
        'Name Picker',
        'Team Generator',
        'Yes or No',
    ];
    
    return (
        <Row style={{ marginLeft: '50px' }}>
            {navMenu.map((item) => (
                <ul
                    style={{ listStyle: 'none', marginLeft: '0px' }}
                    onClick={() => props.onSelectConverter(item)}
                    key={item}
                >
                    <li className='randomizer-nav'>{item}</li>
                </ul>
            ))}
        </Row>
    );
};

export default Nav;
