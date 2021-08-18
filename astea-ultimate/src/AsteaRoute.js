import { Redirect, Route, useParams } from 'react-router-dom';
import useAuth from './hooks/useAuth';

/**A route that requires an Astea login. Here we validate that we are logged in.*/
const AsteaRoute = ({ children, component, ...rest }) => {
    const auth = useAuth(); //Check if authenticated

    return (
        <Route {...rest}>
            {auth && !auth.success && <Redirect to="/login" />}
            {children}
            {component(rest)}
        </Route>
    );
}

export default AsteaRoute;