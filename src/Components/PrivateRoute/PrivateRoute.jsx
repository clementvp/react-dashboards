import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const {
    loading,
    isAuthenticated,
    loginWithRedirect,
    getTokenSilently,
  } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }

    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: window.location.pathname },
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path, getTokenSilently]);

  const render = (props) => {
    if (isAuthenticated === true) {
      return <Component {...props} />;
    } else {
      return null;
    }
  };

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
