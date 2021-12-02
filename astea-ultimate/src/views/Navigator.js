import SearchView from "./SearchView";
import "./HomeView.css";
import { faBoxes, faCog, faHourglassStart, faLayerGroup, faPlus, faSearch, faClipboard } from "@fortawesome/free-solid-svg-icons";
import NavModule from "../NavModule";
import React, { useState } from "react";
import AgingView from "./AgingView";
import RequisitionView from "./RequisitionView";
import OptionsView from "./OptionsView";
import PartsView from "./PartsView";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setModule } from "../actions/nav";

//TODO help
const Navigator = () => {
    const module = useSelector(state => state.nav.module);
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();

    const handleNavClick = (newModule, autoExpand) => {
        if (module === newModule) {
            setExpanded(!expanded);
            //TODO maybe animate to shrink
        }else{
            //Maybe add autoExpand attribute to navs at some point.
            //Also add an expandable boolean as well.
            setExpanded(true);
        }
        //TODO maybe handle navigation here with const navigate = useNavigate();
        dispatch(setModule(newModule));
    }

    return (
        <div style={{display: 'flex', height: '100vh'}}>
            <nav className="nav">
                <NavModule module="SearchView" onClick={handleNavClick} icon={faSearch}>Locator</NavModule>
                <NavModule module="AgingView" onClick={handleNavClick} icon={faHourglassStart} enabled={false}>Aging</NavModule>
                <NavModule module="PartsView" onClick={handleNavClick} icon={faLayerGroup} enabled={false}>Parts</NavModule>
                <NavModule module="RequisitionView" onClick={handleNavClick} icon={faBoxes} enabled={false}>Requisition</NavModule>
                <NavModule module="OptionsView" onClick={handleNavClick} icon={faCog} enabled={false}>Options</NavModule>
                <div className="nav-spacer" />
                <Link className="module-link" to="/astea/ResolvedAudit"><NavModule icon={faClipboard} enabled={false}>Resolved Audit</NavModule></Link>
                <Link className="module-link" to="/astea/ServiceOrder/new"><NavModule icon={faPlus} enabled={false}>New Service Order</NavModule></Link>
            </nav>
            {/*These are navigation modules to help search and narrow down information*/}
            <div className="side-container">
                {expanded && <div className="homeview">
                    {module === "SearchView" && <SearchView />}
                    {module === "AgingView" && <AgingView />}
                    {module === "RequisitionView" && <RequisitionView />}
                    {module === "OptionsView" && <OptionsView />}
                    {module === "PartsView" && <PartsView />}
                </div>}
            </div>
        </div>
    );
};

export default Navigator;