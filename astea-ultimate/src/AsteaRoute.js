import { Redirect, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import SearchView from './SearchView';

/**A route that requires an Astea login. Here we validate that we are logged in.*/
const AsteaRoute = ({ children, ...rest }) => {
    //Check if authenticated
    const authentication = useAuth();
    console.log(authentication);
    if(!authentication){
        return <Redirect to="/login" />;
    }

    return (
        <Route {...rest}>
            {children}
        </Route>
    );
}

export default AsteaRoute;