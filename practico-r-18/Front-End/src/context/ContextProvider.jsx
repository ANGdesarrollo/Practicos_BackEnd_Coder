import io from 'socket.io-client';
import { SOCKET_URL } from "../config/default";
import { createContext, useEffect, useState } from "react";
import { useForm, useFetch, useNormalizr, useCompressed, useValidations } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useCheckLog } from "../hooks/useCheckLog.js";

const socket = io( SOCKET_URL, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": ''
    }
} );

export const ContextProvider = createContext( { socket } );

export const SocketsProvider = ( { children } ) => {

    const [ newMessage, setNewMessage ] = useState( [] );
    const [ allMessages, setAllMessages ] = useState( [] );
    const [ percentage, setPercentage ] = useState( '' );
    const [ allProducts, setAllProducts ] = useState( [] );
    const [ cart, setCart ] = useState( [] );

    const setProduct = ( product ) => {
        setCart( [ ...cart, product ] );
        alert('Product successfully added')
    }

    const { data, isLoading } = useFetch( `${ SOCKET_URL }/api/test-products` );
    const { denormalizedData } = useNormalizr();
    const { showCompressionPercentage } = useCompressed()
    const { validateField, validateEmail, validateImageUrl } = useValidations();

    const { formState, onInputChange, onResetForm } = useForm();

    const { product, price, thumbnail } = formState;
    const { message } = formState;

    useEffect( () => {
        if ( data ) {
            setAllProducts( [ ...allProducts, ...data.products ] )
        }
    }, [ data ] );


    const sendProduct = ( e ) => {
        e.preventDefault();
        if ( !validateField( product ) ) {
            return alert( 'Complete the Product field' )
        }
        if ( !validateField( price ) ) {
            return alert( 'Complete the Price field' )
        }
        if ( !validateImageUrl( thumbnail ) ) {
            return alert( 'Wrong format of Image' )
        }

        socket.emit( 'productAdded', { product, price, thumbnail } );
    };

    const navigate = useNavigate();

    const orderProducts = () => {
        const orderProducts = allProducts.sort( ( a, b ) => a.price - b.price );
        setAllProducts(orderProducts)
        navigate('/chat')
        navigate('/home')
    }

    const { isLogged, checkIsLogged } = useCheckLog();

    useEffect( () => {
        checkIsLogged()
    }, [] );

    const sendMessage = ( e ) => {
        e.preventDefault();
        if ( !validateField( message ) ) {
            return alert( 'Complete the Message field!' )
        }

        const email = isLogged.username.username
        const username = isLogged.username.name

        const dataMessage = {
            author: { email, username  },
            text: message
        }
        socket.emit( 'dataMessage', dataMessage )
    }

    socket.on( 'productAdded', ( data ) => {
        setAllProducts( [ ...allProducts, data ] )
    } );

    socket.on( 'newMessage', ( data ) => {
        setNewMessage( [ ...newMessage, data ] )
    } );

    socket.on( 'allChats', ( data ) => {
        const dataDenormalizada = denormalizedData( data );
        const dataNormalizadaLength = JSON.stringify( data, null, 4 ).length;
        const dataDenormalizadaLength = JSON.stringify( dataDenormalizada, null, 4 ).length;
        const dataPercentage = showCompressionPercentage( dataDenormalizadaLength, dataNormalizadaLength );

        setPercentage( dataPercentage )
        setAllMessages( dataDenormalizada.messages );
    } );

    socket.on( 'allProducts', ( data ) => {
        setAllProducts( data )
    } )

    return (
        <ContextProvider.Provider value={ {
            onInputChange,
            sendProduct,
            isLoading,
            sendMessage,
            onResetForm,
            newMessage,
            allMessages,
            percentage,
            allProducts,
            setProduct,
            cart,
            orderProducts
        } }>
            { children }
        </ContextProvider.Provider>
    )
}
