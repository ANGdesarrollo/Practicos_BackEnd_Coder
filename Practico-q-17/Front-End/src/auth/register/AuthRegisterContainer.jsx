import { AuthRegisterLayout } from "./AuthRegisterLayout";
import { useForm, useValidations } from "../../hooks/index.js";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { SOCKET_URL } from "../../config/default.js";

Axios.defaults.withCredentials = true

export const AuthRegisterContainer = () => {
    const { onInputChange, formState } = useForm();
    const { validateEmail, validateField } = useValidations();
    const { email, password, repeatPassword } = formState;
    const navigate = useNavigate()

    const onSubmitRegister = ( e ) => {
        e.preventDefault();

        const isValidateEmail = validateEmail( email );
        const isValidatePw = validateField( password );
        const isValidateRepeatPw = validateField( repeatPassword );

        if ( isValidateEmail && isValidatePw === isValidateRepeatPw ) {
            Axios.post( `${ SOCKET_URL }/api/auth/register`, {
                username: email,
                password
            } ).then( ( { data } ) => {
                navigate( '/login' )
            } ).catch( err => navigate( '/errorRegister' ) )

        } else {
            alert( 'Invalid email or password' );
        }
    }

    return (
        <AuthRegisterLayout
            onInputChange={ onInputChange }
            onSubmitRegister={ onSubmitRegister }

        />
    )
}
