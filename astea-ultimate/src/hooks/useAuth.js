import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

const cookies = new Cookies();

const useAuth = () => {
    const token = cookies.get('astea-session');
    if(!token) return false;
    
    const decoded = jwt_decode(token);
    console.log(decoded);
    return decoded;
}

export default useAuth;