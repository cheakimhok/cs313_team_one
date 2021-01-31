import React from 'react';
import Header from './Header';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ConfirmEmail from './ConfirmEmail';
import ConfirmPassword from './ConfirmPassword';
import { Route, Switch } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route path={'/signin'} component={SignIn} />
                <Route path={'/signup'} component={SignUp} />
                <Route path={'/ConfirmEmail'} component={ConfirmEmail} />
                <Route path={'/ConfirmPassword'} component={ConfirmPassword} />
            </Switch>
        </div>
    );
};

export default Main;
