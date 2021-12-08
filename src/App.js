import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import PrivateRoute from './Utils/PrivateRoute';
import axios from 'axios';
import PublicRoute from './Utils/PublicRoute';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import { getToken, removeUserSession, setUserSession} from './Utils/Common'


function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:3000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }
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
            <PublicRoute path="/Login" component={Login} />
            <PrivateRoute path="/Dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
