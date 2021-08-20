import { Redirect } from 'react-router-dom';
import useAuth from './hooks/useAuth';

/**A route that requires an Astea login. Here we validate that we are logged in.*/
const Authenticator = (props) => {
    const auth = useAuth(); //Check if authenticated

    return (auth && !auth.success) ? (
        <Redirect to="/login" />
    ) : <></>
}

export default Authenticator;