import { Container, Col, Row, ListGroup, Tab, } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Nav = (props) => {
    const navMenu = ['Length', 'Weight', 'Volume', 'Area', 'Data', 'Time', 'Temperature'];
    return (
        <Container id="unit-converter">
            <Row>
                <ListGroup>
                    <Row>
                        {navMenu.map((item) => (
                            <Col className='converter-length' onClick={() =>
                                props.onSelectConverter(item)
                            } key={item}>
                                <span>{item}</span>
                            </Col>

                        ))}
                    </Row>
                </ListGroup>
            </Row>
        </Container>
    );
}

export default Nav;
