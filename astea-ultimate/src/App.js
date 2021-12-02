
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './App.css';
import LoginView from './LoginView';
import Navigator from './HomeView';
import ServiceOrder from './ServiceOrder';
import NewServiceOrder from "./NewServiceOrder";
import ResolvedAuditView from './ResolvedAuditView';
import { useSelector } from 'react-redux';

function App() {
    const auth = useSelector(state => state.auth);

    return (
        <div className="App app-container">
            <Router>
                <Route path="/astea" component={Navigator} />
                <Switch>
                    <Route exact path="/login" component={LoginView} />
                    <Route path="/astea/ServiceOrder/new" component={NewServiceOrder} />
                    <Route path="/astea/ServiceOrder/:id" component={ServiceOrder} />
                    <Route path="/astea/ResolvedAudit" component={ResolvedAuditView} />
                    {auth.sessionId === null ? <Redirect to="/login" /> : <Redirect to="/astea" />}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
