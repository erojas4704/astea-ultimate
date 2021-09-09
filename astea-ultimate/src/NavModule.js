import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavModule = ({ children, active, icon }) => {
    const className = active ? 'nav-element active' : 'nav-element';
    return (
        <div className={className}>
            <FontAwesomeIcon icon={icon} />
            <div className="nav-label">{children}</div>
        </div>
    );
}

export default NavModule;
