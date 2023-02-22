import { AuthRegisterLayout } from "./AuthRegisterLayout";
import { useForm, useValidations } from "../../hooks/index.js";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { SOCKET_URL } from "../../config/default.js";
import { useState } from "react";

Axios.defaults.withCredentials = true

export const AuthRegisterContainer = () => {
    const { onInputChange, formState } = useForm();
    const { validateEmail, validateField, esVariableNumerica } = useValidations();
    const { email, password, repeatPassword, name, address, avatar, age } = formState;
    const navigate = useNavigate();
    const [ phoneNumber, setPhoneNumber ] = useState( Number );

    const handlePhoneNumberChange = ( value, countryData, event ) => {
        const { dialCode } = event;
        let completeData = `${ dialCode }${ countryData }`;
        completeData = Number( completeData );
        setPhoneNumber( completeData );
    };


    const onSubmitRegister = ( e ) => {
        e.preventDefault();

        const isValidateEmail = validateEmail( email );
        const isValidatePw = validateField( password );
        const isValidateNumber = esVariableNumerica( phoneNumber );

        if ( isValidateEmail && isValidatePw && password === repeatPassword && isValidateNumber && isValidateNumber ) {
            console.log(age)
            Axios.post( `${ SOCKET_URL }/api/auth/register`, {
                name,
                address,
                age,
                phoneNumber,
                avatar,
                username: email,
                password
            } ).then( ( { data } ) => {
                navigate( '/login' )
            } ).catch( err => navigate( '/errorRegister' ) )

        } else {
            alert( 'Invalid data, check the fields' );
        }
    }

    return (
        <AuthRegisterLayout
            onInputChange={ onInputChange }
            onSubmitRegister={ onSubmitRegister }
            handlePhoneNumberChange={ handlePhoneNumberChange }

        />
    )
}
