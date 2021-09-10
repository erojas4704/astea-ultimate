import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavModule = ({ children, active, icon, onClick }) => {
    const className = active ? 'nav-element active' : 'nav-element';
    return (
        <div onClick={onClick} className={className}>
            <FontAwesomeIcon icon={icon} />
            <div className="nav-label">{children}</div>
        </div>
    );
}

export default NavModule;
