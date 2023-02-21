import React, { useState, useEffect } from 'react';
import { RandomLayout } from "./RandomLayout";
import Axios from "axios";
import { SOCKET_URL } from "../../config/default.js";
import { useParams } from "react-router-dom";

Axios.defaults.withCredentials = true;

export const RandomContainer = () => {
    const [ randoms, setRandoms ] = useState( {} )
    const { number } = useParams();

    const getRandoms = () => {
        Axios.post( `${ SOCKET_URL }/api/randoms`, {
            number
        },  )
            .then( ( { data } ) => {
                setRandoms( data )
            } )
    }

    useEffect( () => {
        getRandoms()
    }, [] );


    return (
        <RandomLayout randoms={ randoms }/>
    );
};
