
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginView from './views/LoginView';
import Navigator from './views/Navigator';
import ServiceOrder from './views/ServiceOrder';
import NewServiceOrder from "./views/NewServiceOrder";
import ResolvedAuditView from './views/ResolvedAuditView';
import { useSelector } from 'react-redux';
import RequireAuth from './components/RequireAuth';
import Api from './api';
import { useEffect } from 'react';

function App() {
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        const test = (async () => {
            const {data, cancel} = Api.cancelableRequest(Api.getServiceOrder, "SV2112120379@@1");
            console.log(data, cancel);
            const d = await data;
            console.log(d);
        })()
    }, []);

    return (
        <div className="App app-container">
            <Router>
                {auth.sessionId !== null && <Navigator />}
                <Routes>
                    <Route path="/" element={auth.sessionId === null ? <Navigate to="/login" /> : <Navigate to="/astea" />} />
                    <Route path="/login" element={<LoginView />} />
                    <Route path="/astea" element={<RequireAuth />}>
                        <Route path="/astea/ServiceOrder/new" element={<NewServiceOrder />} />
                        <Route path="/astea/ServiceOrder/:id" element={<ServiceOrder />} />
                        <Route path="/astea/ResolvedAudit" element={<ResolvedAuditView />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
