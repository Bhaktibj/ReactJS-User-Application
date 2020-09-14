import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {authHeader} from '../helpers/auth_header';
export const ProtectedRoutes = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => {
          if (authHeader()) {
            console.log("hedaerr......", authHeader())
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
    );
  };