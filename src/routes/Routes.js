import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { history } from '../helpers';
import { ProtectedRoutes } from './protected.routes';
import {
    HeaderPage,
    RegisterPage,
    GetUser,
    LoginPage,
    UpdatePage,
    HomePage
} from "../components";

const Routes = () => {
    const alert = useSelector(state => state.alert);
    return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-md-8 offset-md-2">
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        {/* <ProtectedRoutes path="/header" component={HeaderPage} /> */}
                        <ProtectedRoutes path="/home" component={HomePage} />
                        <ProtectedRoutes path="/update/:id" component={UpdatePage} />
                        <ProtectedRoutes path="/get/:id" component={GetUser} />
                        {/* <Redirect from="*" to="/home" /> */}
                    </Switch>
                </Router>
            </div>
            </div>
        </div>
    );
}

export default Routes;