import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { logoutUser } from './Actions/user';

const OptionsView = () => {
    const dispatch = useDispatch();

    return (
        <Container>
            <Button variant="danger" onClick={() => dispatch(logoutUser())}>Log Out</Button>
        </Container>
    )
}

export default OptionsView;