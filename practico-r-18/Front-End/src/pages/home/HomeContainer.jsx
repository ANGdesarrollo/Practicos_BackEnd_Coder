import { FormProducts } from "./FormProducts";
import { ProductsListed } from "./ProductsListed";
import Axios from 'axios';
import {  useEffect } from "react";
import { useCheckLog } from "../../hooks/useCheckLog.js";


Axios.defaults.withCredentials = true

export const HomeContainer = () => {

    const { isLogged, checkIsLogged } = useCheckLog();

    useEffect( () => {
        checkIsLogged()
    }, [] );


    return (
        <>
            { !isLogged.status ? <h2>Loading...</h2> :
                <>
                    <FormProducts/>
                    <ProductsListed/>
                </>
            }

        </>
    )
}
