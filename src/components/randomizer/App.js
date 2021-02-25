import react, { Component } from 'react';
import Nav from './Nav';
import Body from './Body';
import { Container, Row } from 'react-bootstrap';
import './App.css';
import axios from 'axios'
import UrlService from '../services/UrlService'
import { Redirect } from 'react-router'


export default class randomizer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            result: [],
            activeRandomizer: 1,
            qty: 0,
            tGenerator: false,
            customList: false,
        }
        this.handleSelectConverter = this.handleSelectConverter.bind(this);
    }

    handleSelectConverter(con) {
        this.setState({
            activeRandomizer: this.handleType(con)
        })

    }

    setResult(result) {
        this.setState({
            result: result
        })
    }
    handleGetQty = (qty) => {
        this.setState({
            qty: qty,
        })
        console.log(qty);
    }

    handleGetData = (items) => {
        axios.post(UrlService.handleRandomizer(), {
            type: this.state.activeRandomizer,
            data: { items, qty: this.state.qty }
        }).then((result) => {
            this.setResult(
                result.data.result
            )
            console.log(this.state.result)
        }).catch((err) => {
            console.log(err)
        });
    }

    handleType = (data) => {
        let type = null;
        this.setState({ tGenerator: false, customList: false, result: [] })

        switch (data) {
            case 'Random Picker':
                type = 1;
                break;
            case 'Custom List':
                type = 2;
                this.setState({
                    customList: true,
                })
                break;
            case 'Decision Maker':
                type = 3;
                break;
            case 'Name Picker':
                type = 4;
                break;
            case 'Team Generator':
                type = 5;
                this.setState({
                    tGenerator: true,
                })
                break;
            case 'Yes or No':
                type = 6;
                console.log(this.state.customList)
                break;
            default:
                break;
        }
        return type;
    }

    location = {
        pathname: '/signIn',
        state: { fromDashboard: true }
    }
    render() {
        if (!this.props.user) {
            return <Redirect to='/SignIn' />;
        }
        return (
            <Container id="unit-converter">
                <Row>
                    <Nav onSelectConverter={this.handleSelectConverter} />
                    <Body onGetData={this.handleGetData}
                        teamGenerator={this.state.tGenerator}
                        customListItem={this.state.customList}
                        getResult={this.state.result}
                        onGetQty={this.handleGetQty}
                    />
                    <h2>ActiveConverter: {this.state.activeRandomizer}</h2>
                </Row>
            </Container >
        )
    }
};
