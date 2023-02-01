import { AuthLoginLayout } from "./AuthLoginLayout.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/index.js";
import Axios from 'axios';

Axios.defaults.withCredentials = true

export const AuthLoginContainer = () => {
    const { formState, onInputChange } = useForm();
    const { userAuth, password } = formState;

    const navigate = useNavigate();

    const handleSubmit = async( e ) => {
        e.preventDefault();
        console.log(userAuth, password)

        Axios.post( 'http://localhost:8080/api/auth/login', {
            username: userAuth,
            password: password
        } ).then( ( { data } ) => {
            if( data.status ) {
                navigate( '/home' )
            } else {
                alert( 'error al iniciar sesion' )
            }
        } ).catch(err =>  navigate('/errorLogin'))
    }
    return (
        <AuthLoginLayout
            handleSubmit={ handleSubmit }
            onInputChange={ onInputChange }/>
    )
}
