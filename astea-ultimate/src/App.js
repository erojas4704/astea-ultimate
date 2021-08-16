
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import AsteaRoute from './AsteaRoute';
import HomeView from './HomeView';
import LoginView from './LoginView';
import QuickView from './QuickView';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <AsteaRoute component={HomeView} />
          </Route>
          <AsteaRoute path="/home" component={HomeView} />
          <AsteaRoute path="/lookup" component={QuickView} />
          <Route path="/login" component={LoginView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
