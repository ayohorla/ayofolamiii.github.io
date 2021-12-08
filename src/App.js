import {React, useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import PrivateRoute from './Utils/PrivateRoute';
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

    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
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
    
    <Router>
     <h1>Square Loan</h1>
      <div>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
          <NavLink activeClassName="active" to="/Login">Login</NavLink><small>(Access without token only)</small>
          <NavLink activeClassName="active" to="/Dashboard">Dashboard</NavLink><small>(Access with token only)</small>
        </div>
        <div className="content">
          <Routes>
            <Route exact path="/" element={Home}>
              
            </Route>
            <Route path="/Login" element={PrivateRoute}>
               <Route path ="/Login" element={Login}/>
            </Route>

            <Route path="/Dashboard" element={PublicRoute}>
               <Route path ="/Dashboard" element={Login}/>
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
