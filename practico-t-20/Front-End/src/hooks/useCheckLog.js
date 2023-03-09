import Axios from "axios";
import { SOCKET_URL } from "../config/default.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCheckLog = () => {
    const navigate = useNavigate();

    const [ isLogged, setIsLogged ] = useState( { status: null, username: '' } );

    const checkIsLogged = () => {
        Axios.get( `${ SOCKET_URL }/api/auth` )
            .then( ( { data } ) => {
                if ( data.status ) {
                    setIsLogged( {
                        status: true,
                        username: data.username
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
    }

    return {
        checkIsLogged,
        isLogged,
        setIsLogged

    }
}
