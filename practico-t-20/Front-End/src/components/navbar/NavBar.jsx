import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './navbar.css'
import { useContext, useEffect } from "react";
import { ContextProvider } from "../../context/ContextProvider.jsx";
import { useCheckLog } from "../../hooks/useCheckLog.js";
import Axios from "axios";
import { SOCKET_URL } from "../../config/default.js";

export const NavBar = () => {
    const random = Math.floor( Math.random() * 1000 )
    const { cart } = useContext( ContextProvider )
    const navigate = useNavigate();

    const { setIsLogged } = useCheckLog();

    const logOut = () => {
        Axios.get( `${ SOCKET_URL }/api/auth/logout` )
            .then( ( { data } ) => {
                if ( data.status ) {
                    setIsLogged( {
                        status: false,
                        user: ''
                    } )
                    setTimeout( () => {
                        navigate( '/' )
                    }, 2000 )
                } else {
                    setIsLogged( {
                        status: true,
                        user: 'Error, please try again later.'
                    } )
                }
            } )
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
                    <NavLink onClick={ () => navigate( '/home' ) } className="text-light p-2">HOME</NavLink>
                    <NavLink onClick={ () => navigate( '/chat' ) } className="text-light p2">CHAT</NavLink>
                    <NavLink onClick={ () => navigate( '/info' ) } className="text-light p-2">INFO</NavLink>
                    <NavLink onClick={ () => navigate( `/random/${ random }` ) } className="text-light p-2">GET
                        RANDOMS</NavLink>
                </Container>
                <div className="cart"><NavLink onClick={ () => navigate( '/cart' ) }>
                    <span style={ { color: "white" } }
                          className="material-symbols-outlined">shopping_cart
                    </span>
                    <span className="number-added text-light">
                        { cart.length !== 0 && cart.length }
                    </span>
                </NavLink>
                </div>
                <span onClick={ logOut } style={ { color: "white", cursor: "pointer" } }
                      className="material-symbols-outlined p-2">
logout
</span>

            </Navbar>
        </>
    );
}
