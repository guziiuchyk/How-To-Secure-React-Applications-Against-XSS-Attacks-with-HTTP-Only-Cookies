import './App.css';

import { useState, useEffect } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SubscriberFeed from "./components/SubscriberFeed";
import Login from './components/Login';
import XSSHelper from './components/XSSHelper'

function App() {
  let [authenticated, setAuthenticated] = useState(false);
  let [loading, setLoading] = useState(true)

  async function getAuthStatus() {
    await setLoading(true);
    return fetch('http://localhost:8080/auth-status', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(data => data.json())
  }

  async function isAuthenticated() {
    const authStatus = await getAuthStatus();
    await setAuthenticated(authStatus.isAuthenticated);
    await setLoading(false);
  }

  async function logoutUser() {
    await fetch('http://localhost:8080/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    isAuthenticated();
  }

  useEffect(() => {
    isAuthenticated();
  }, [])

  return (
    <>
      {!loading && (
        <>
          {!authenticated && <Login />}

          {authenticated && (
            <div className="App wrapper">
              <h1 className="App-header">
                JWT-Storage-Tutorial Application
              </h1>
              <button onClick={logoutUser}>Logout</button>
              <BrowserRouter>
                <Switch>
                  <Route path="/subscriber-feed">
                    <SubscriberFeed />
                  </Route>
                  <Route path="/xss-helper">
                    <XSSHelper />
                  </Route>
                </Switch>
              </BrowserRouter>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;