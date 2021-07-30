import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../features/auth/Login';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" render={() => <h1>Hello world!</h1>} exact />
      <Route path="/login" component={Login} exact />

      <Route
        render={() => (
          <h1>Ooops. We couldn't find the page you're looking for.</h1>
        )}
      />
    </Switch>
  );
};

export default Routes;
