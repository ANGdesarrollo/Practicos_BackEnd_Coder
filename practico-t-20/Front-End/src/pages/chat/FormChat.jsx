import { useContext, useEffect, useRef } from "react";
import { ContextProvider } from "../../context/ContextProvider.jsx";
import { useCheckLog } from "../../hooks/useCheckLog.js";

export const FormChat = ( { isLogged } ) => {

    const { onInputChange, sendMessage } = useContext( ContextProvider );
    const refInputMessage = useRef()

    return (
        <form className="container p-4" id="js-form-chat" onSubmit={ sendMessage }>
            <div className="form-outline">
                <label className="form-label" htmlFor="user-email-chat">Email</label>
                <input onChange={ onInputChange } disabled={ true } value={ isLogged.username.username } type="email"
                       className="form-control" id="user-email-chat"
                       name="email"
                />
            </div>

            <div className="form-outline">
                <label className="form-label" htmlFor="sendMessage">Message</label>
                <textarea ref={ refInputMessage } onChange={ onInputChange } name="message" id="sendMessage"
                          placeholder="Write your message"
                          className="form-control"></textarea>
            </div>
            <div>
                <input id="button" onClick={ () => refInputMessage.current.value = '' } type="submit"
                       className="btn btn-primary btn-block mt-4"
                       value="Send Message"></input>
            </div>
        </form>
    )
}
