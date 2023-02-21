import { Chat } from "./Chat.jsx";
import { FormChat } from "./FormChat.jsx";
import { useCheckLog } from "../../hooks/useCheckLog.js";
import { useEffect } from "react";

export const ChatContainer = () => {
    const { isLogged, checkIsLogged } = useCheckLog();

    useEffect( () => {
        checkIsLogged()
    }, [] );
    return (
        <>
            { isLogged.status && <>
                <Chat/>
                <FormChat isLogged={ isLogged }/>
            </> }
        </>
    );
};
