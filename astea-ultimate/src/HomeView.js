import SearchView from "./SearchView";
import "./HomeView.css";
import { faBoxes, faCog, faHourglassStart, faLayerGroup, faSearch } from "@fortawesome/free-solid-svg-icons";
import NavModule from "./NavModule";
import React, { useState } from "react";

const HomeView = () => {
    const [module, setModule] = useState("Search");
    const View = SearchView;//TODO better semantics

    return (
        <>
            <div className="side-container">
                <div className="homeview">
                    <View />
                </div>
            </div>
            <nav className="nav">
                <NavModule onClick={() => setModule("Search")}      active={module==="Search"} icon={faSearch}>Locator</NavModule>
                <NavModule onClick={() => setModule("Aging")}       active={module==="Aging"} icon={faHourglassStart} enabled={false}>Aging</NavModule>
                <NavModule onClick={() => setModule("Parts")}       active={module==="Parts"} icon={faLayerGroup} enabled={false}>Parts</NavModule>
                <NavModule onClick={() => setModule("Requisition")} active={module==="Requisition"} icon={faBoxes} enabled={false}>Requisition</NavModule>
                <NavModule onClick={() => setModule("Options")}     active={module==="Options"} icon={faCog} enabled={false}>Options</NavModule>
            </nav>
        </>
    );
};

export default HomeView;