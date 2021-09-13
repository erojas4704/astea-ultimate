import SearchView from "./SearchView";
import "./HomeView.css";
import { faBoxes, faCog, faHourglassStart, faLayerGroup, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import NavModule from "./NavModule";
import React, { useState } from "react";
import AgingView from "./AgingView";
import RequisitionView from "./RequisitionView";
import OptionsView from "./OptionsView";
import PartsView from "./PartsView";
import { Link } from "react-router-dom";

const HomeView = () => {
    const [module, setModule] = useState("SearchView");

    //Todo needs better semantics.
    return (
        <>
            <div className="side-container">
                <div className="homeview">
                    {module === "SearchView" && <SearchView />}
                    {module === "AgingView" && <AgingView />}
                    {module === "RequisitionView" && <RequisitionView />}
                    {module === "OptionsView" && <OptionsView />}
                    {module === "PartsView" && <PartsView />}
                </div>
            </div>
            <nav className="nav">
                <NavModule onClick={() => setModule("SearchView")} active={module === "SearchView"} icon={faSearch}>Locator</NavModule>
                <NavModule onClick={() => setModule("AgingView")} active={module === "AgingView"} icon={faHourglassStart} enabled={false}>Aging</NavModule>
                <NavModule onClick={() => setModule("PartsView")} active={module === "PartsView"} icon={faLayerGroup} enabled={false}>Parts</NavModule>
                <NavModule onClick={() => setModule("RequisitionView")} active={module === "RequisitionView"} icon={faBoxes} enabled={false}>Requisition</NavModule>
                <NavModule onClick={() => setModule("OptionsView")} active={module === "OptionsView"} icon={faCog} enabled={false}>Options</NavModule>
                <div className="nav-spacer" />
                <Link className="module-link" to="/astea/ServiceOrder/new"><NavModule icon={faPlus} enabled={false}>New Service Order</NavModule></Link>
            </nav>
        </>
    );
};

export default HomeView;