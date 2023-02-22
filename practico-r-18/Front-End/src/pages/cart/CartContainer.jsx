import React, { useEffect, useContext, useState } from 'react';
import { CartLayout } from "./CartLayout";
import { useCheckLog } from "../../hooks/useCheckLog.js";
import { ContextProvider } from "../../context/ContextProvider.jsx";
import Axios from 'axios';
import { SOCKET_URL } from "../../config/default.js";
import { useNavigate } from "react-router-dom";

Axios.defaults.withCredentials = true;

export const CartContainer = () => {
    const navigate = useNavigate();
    const [ success, setSuccess ] = useState(false)
    const { isLogged, checkIsLogged } = useCheckLog();
    const { cart } = useContext( ContextProvider );
    const CartToSend = {
        user: isLogged.username.username,
        cart
    }
    const setCart = () => {
        Axios.post( `${ SOCKET_URL }/api/cart`, {
            CartToSend
        })
            .then( ( { data } ) => {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/home')
                }, 3000)
            } )
            .catch( err => console.log( err ) )
    }


    useEffect( () => {
        checkIsLogged()
    }, [] );
    return (
        isLogged.status && <>
            <CartLayout dataUser={ isLogged.username } cart={ cart } setCart={ setCart } success={success}/>
        </>

    );
};
