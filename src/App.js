import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';

function App() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState({});
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  var url = "http://localhost:8000";
  useEffect(() => {
    fetch(`${url}/auth/checkLoggedIn`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    }).then(response => {
      if (response.status === 200) return response.json();
      throw new Error("failed to authenticate user");
    }).then(responseJSON => {
      setAuthenticated(true);
      setUserId(responseJSON.user._id);
      setName(responseJSON.user.name);
    }).catch(err => {
      setAuthenticated(false);
      setError("Failed to authenticate user");
      console.log(error);
    });
  }, []);

  return (
    <Router>
      <Switch >
      <Route path="/login" render={(props) => (
          <LoginPage {...props} url={url} user={{ name: name, id: userId, }} authenticated={authenticated} />
        )} />
        <Route path="/profile" render={(props) => (
          <ProfilePage {...props} url={url} user={{ name: name, id: userId, }} authenticated={authenticated} />
        )} />
      </Switch>
    </Router>
  );
}

export default App;
