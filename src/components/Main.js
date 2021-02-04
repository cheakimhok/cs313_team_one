import React from 'react';
import Header from './Header';
import ScientificCalculator from './ScientificCalculator';
import { Route, Switch } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route path={'/ScientificCalculator'} component={ScientificCalculator} />
            </Switch>
        </div>
    );
};

export default Main;
