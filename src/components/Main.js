import React from 'react';
import Header from './Header';
import { Route, Switch } from 'react-router-dom';
import UnitConverter from './UnitConverter';

const Main = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route path={'/UnitConverter'} component={UnitConverter} />
            </Switch>
        </div>
    );
};

export default Main;
