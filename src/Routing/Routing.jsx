import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../Views/Home/Home";
import DashboardCreation from "../Views/DashboardCreation/DashboardCreation";
import DashboardEdit from "../Views/DashboardEdit/DashboardEdit";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import { useAuth0 } from "../react-auth0-spa";
import { ApolloProvider } from "@apollo/react-hooks";

import createApolloClient from "../Utils/createGraphQlClient";

const Routing = () => {
  const [jwt, setJwt] = useState(undefined);

  const { loading, isAuthenticated, user, getTokenSilently } = useAuth0();

  useEffect(() => {
    if (loading) {
      return;
    }

    const getToken = async () => {
      const token = await getTokenSilently();
      setJwt(token);
      return;
    };

    if (isAuthenticated) {
      getToken();
      return;
    }
  }, [getTokenSilently, isAuthenticated, loading, user]);

  const client = createApolloClient(jwt);

  return (
    <ApolloProvider client={client}>
      <Router>
        <PrivateRoute exact path="/" component={Home}></PrivateRoute>
        <PrivateRoute
          exact
          path="/creation"
          component={DashboardCreation}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/edit/:dashboardId"
          component={DashboardEdit}
        ></PrivateRoute>
      </Router>
    </ApolloProvider>
  );
};

export default Routing;
