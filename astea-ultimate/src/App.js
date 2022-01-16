
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginView from './views/LoginView';
import Navigator from './views/Navigator';
import ServiceOrder from './views/ServiceOrder';
import NewServiceOrder from "./views/NewServiceOrder";
import ResolvedAuditView from './views/ResolvedAuditView';
import { useSelector } from 'react-redux';
import RequireAuth from './components/RequireAuth';
import ServiceOrderView from './views/ServiceOrderView';
import { createContext, useState } from 'react';

export const NavContext = createContext({
    isExpanded: false
});

function App() {
    const auth = useSelector(state => state.auth);
    const [navSettings, setNavSettings] = useState({
        isExpanded: false
    });

    return (
        <div className="App app-container">
            <NavContext.Provider value={navSettings}>
                <Router>
                    {auth.sessionId !== null && <Navigator onUpdateNavSettings={setNavSettings}/>}
                    <Routes>
                        <Route path="/" element={auth.sessionId === null ? <Navigate to="/login" /> : <Navigate to="/astea" />} />
                        <Route path="/login" element={<LoginView />} />
                        <Route path="/astea" element={<RequireAuth />}>
                            <Route path="/astea/ServiceOrder/new" element={<NewServiceOrder />} />
                            <Route path="/astea/ServiceOrder2/:id" element={<ServiceOrderView />} />
                            <Route path="/astea/ServiceOrder/:id" element={<ServiceOrder />} />
                            <Route path="/astea/ResolvedAudit" element={<ResolvedAuditView />} />
                        </Route>
                    </Routes>
                </Router>
            </NavContext.Provider>
        </div>
    );
}

export default App;
