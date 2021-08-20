
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Authenticator from './Authenticator';
import LoggedInView from './LoggedInView';
import LoginView from './LoginView';
import HomeView from './HomeView';
import ServiceOrder from './ServiceOrder';

function App() {
  return (
    <div className="App app-container">
      <Router>
        <Route path="/" component={Authenticator} />
        <Route path="/astea" component={HomeView} />
        <Switch>
          <Route exact path="/login" component={LoginView} />
          <Route path="/astea/ServiceOrder/:id"  component={ServiceOrder} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
