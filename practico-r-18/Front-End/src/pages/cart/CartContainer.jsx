import React, { useEffect, useContext } from 'react';
import { CartLayout } from "./CartLayout";
import { useCheckLog } from "../../hooks/useCheckLog.js";
import { ContextProvider } from "../../context/ContextProvider.jsx";
import Axios from 'axios';
import { SOCKET_URL } from "../../config/default.js";

Axios.defaults.withCredentials = true;

export const CartContainer = () => {
    const { isLogged, checkIsLogged } = useCheckLog();
    const { cart } = useContext( ContextProvider );
    const CartToSend = {
        cart
    }
    const setCart = () => {
        Axios.post( `${ SOCKET_URL }/api/cart`, {
            CartToSend
        })
            .then( ( { data } ) => {
                console.log( data );
            } )
            .catch( err => console.log( err ) )
    }


    useEffect( () => {
        checkIsLogged()
    }, [] );
    return (
        isLogged.status && <>
            <CartLayout dataUser={ isLogged.username } cart={ cart } setCart={ setCart }/>
        </>

    );
};
