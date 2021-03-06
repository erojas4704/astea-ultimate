import { Redirect, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';

/**A route that requires an Astea login. Here we validate that we are logged in.*/
const AsteaRoute = (props) => {
    const auth = useAuth(); //Check if authenticated

    return (auth && !auth.success) ? (
        <Route {...props} />
    ) : <Redirect to="/login" />;
}

export default AsteaRoute;