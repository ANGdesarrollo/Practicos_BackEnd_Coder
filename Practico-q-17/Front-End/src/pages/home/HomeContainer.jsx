import { FormProducts } from "./FormProducts";
import { ProductsListed } from "./ProductsListed";
import { Chat } from "./Chat.jsx";
import { FormChat } from "./FormChat";
import Axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SOCKET_URL } from "../../config/default.js";

Axios.defaults.withCredentials = true

export const HomeContainer = () => {
    const [ isLogged, setIsLogged ] = useState( { status: null, user: '' } )
    const navigate = useNavigate();

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


    useEffect( () => {
        Axios.get( `${ SOCKET_URL }/api/auth` )
            .then( ( { data } ) => {
                if ( data.status ) {
                    setIsLogged( {
                        status: true,
                        user: data.user
                    } )
                } else {
                    navigate( '/' )
                    setIsLogged( {
                        status: false,
                        user: ''
                    } )

                }
            } )
            .catch( err => {
                console.log( err )
            } )
    }, [] );


    return (
        <>
            <div>RANDOM CHANGE FOR TP 17</div>
            <FormProducts isLogged={ isLogged } logOut={ logOut }/>
            <ProductsListed/>
            <Chat/>
            <FormChat/>
        </>
    )
}
