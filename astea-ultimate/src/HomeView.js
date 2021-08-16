import { Link } from "react-router-dom"

const HomeView = () => {
    return (
        <div>
            <div>You are logged in good job king</div>
            <Link to="/lookup" >Look up</Link>
        </div>
    );
};

export default HomeView;