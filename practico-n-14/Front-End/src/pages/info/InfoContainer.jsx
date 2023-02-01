import React, { useState, useEffect } from 'react';
import { InfoLayout } from './InfoLayout.jsx';
import Axios from 'axios';
import { SOCKET_URL } from "../../../../../practico-m-13/Front-End/src/config/default.js";

Axios.defaults.withCredentials = true

export const InfoContainer = () => {
    const [ info, setInfo ] = useState({});

    useEffect( () => {
        Axios.get(`${SOCKET_URL}/api/info`)
            .then(({data}) => {
                if(data.status) {
                    setInfo(data.data)
                }
            })
            .catch(err => console.log(err));
    }, [] );

    return (
        <InfoLayout info={info}/>
    );
};
