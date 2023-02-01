import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
    const random = Math.floor(Math.random() * 1000)
    const navigate = useNavigate();
    const onNavigate = (path) => {
        navigate(path)
    }
    return (
        <>
            <Navbar bg="dark">
                <Container className="d-flex justify-content-start w-100 m-0">
                    <Navbar.Brand href="#home">
                        <img
                            src="https://res.cloudinary.com/dwz16rstr/image/upload/v1671852586/react-js-weather/react_gs1igi.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <NavLink onClick={() => navigate('/home')} className="text-light p-2">HOME</NavLink>
                    <NavLink onClick={() => navigate('/info')} className="text-light p-2">INFO</NavLink>
                    <NavLink onClick={() => navigate(`/random/${random}`)} className="text-light p-2">GET RANDOMS</NavLink>
                </Container>
            </Navbar>
        </>
    );
}
