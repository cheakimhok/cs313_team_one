import React from 'react';
import Header from './Header';
// import SignIn from './SignIn';
// import SignUp from './SignUp';
import { Route, Switch } from 'react-router-dom';
import BasicCal from './basicCal/component/App';

const Main = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/BasicCalculator">
                    <BasicCal />
                </Route>
                <Route path="/a">
                    <Header />
                </Route>
                {/* <Route path={'/signin'} component={SignIn} />
                <Route path={'/signup'} component={SignUp} /> */}
            </Switch>
        </div>
    );
};

export default Main;
