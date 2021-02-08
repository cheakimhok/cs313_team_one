import React from 'react';
import Header from './Header';

import { Route, Switch, Redirect } from 'react-router-dom';
// import BasicCal from './basicCal/component/App';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ConfirmEmail from './ConfirmEmail';
import ConfirmPassword from './ConfirmPassword';
import Randomizer from './randomizer/App';
import UrlService from "./services/UrlService";
import axios from 'axios';



export default class Main extends React.Component {
    state = {};
    
    componentDidMount = () => {
        axios.get(UrlService.currentUserProfileUrl()).then(
            res => {
                this.setUser(res.data)
            }
        ).catch (
            err => {
                console.log(err)
            }
        )
    }

    setUser = user => {
        this.setState({
            user: user
        })
    }

    render() {
        
        return (
            <div>
                <Header user={this.state.user} setUser={this.setUser}/>
                <Switch>
                    <Redirect exact from="/CAL_SMAi-TMEi" to="/BasicCalculator" />
                    <Route path="/BasicCalculator">

                    </Route>
                    
                    {/* <Route path={'/signin'} component={SignIn} />
                    <Route path={'/signup'} component={SignUp} /> */}
                    <Route path={'/signin'} component={()=> <SignIn setUser={this.setUser} />} />
                    <Route path={'/signup'} component={()=> <SignUp setUser={this.setUser} />} />
                    <Route path={'/password/forgot'} component={ConfirmEmail} />
                    <Route path={'/password/reset'} component={ConfirmPassword} />
                    <Route path={'/randomizer'} component={() => <Randomizer user={this.state.user} setUser={this.setUser} />} />

                </Switch>
            </div>
        );
    }
};

