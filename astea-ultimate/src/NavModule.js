import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const NavModule = ({ children, icon, onClick, module }) => {
    const activeModule = useSelector(state => state.nav.module);
    const active = activeModule === module;

    const handleClick = e => {
        (onClick && onClick(module));
    }

    return (
        <div onClick={handleClick} className={active ? 'nav-element active' : 'nav-element'}>
            <FontAwesomeIcon icon={icon} />
            <div className="nav-label">{children}</div>
        </div>
    );
}

export default NavModule;
