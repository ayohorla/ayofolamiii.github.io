import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';


function App() {
  return (
    
    <BrowserRouter>
    <h1>Square Loan</h1>
      <div>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
          <NavLink activeClassName="active" to="/Login">Login</NavLink><small>(Access without token only)</small>
          <NavLink activeClassName="active" to="/Dashboard">Dashboard</NavLink><small>(Access with token only)</small>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
