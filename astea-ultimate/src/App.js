
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import AsteaRoute from './AsteaRoute';
import HomeView from './HomeView';
import useAuth from './hooks/useAuth';
import LoginView from './LoginView';
import ServiceOrder from './ServiceOrder';

function App() {
  const auth = useAuth();

  return (
    <div className="App app-container">
      <Router>
        {auth && auth.success && <HomeView />}
        <Switch>
          <AsteaRoute path="/ServiceOrder/:id" component={ServiceOrder} />
          <Route path="/login" component={LoginView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
