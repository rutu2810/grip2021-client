import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import TransHistory from "./TransHistory";
import Transfer from "./Transfer";

function Transactions() {
  const { path } = useRouteMatch();
  return (
    <div style={{ flex: 1 }}>
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${path}/history`} />
        </Route>
        <Route path={`${path}/history`}>
          <TransHistory />
        </Route>
        <Route path={`${path}/transfer`}>
          <Transfer />
        </Route>
      </Switch>
    </div>
  );
}

export default Transactions;
