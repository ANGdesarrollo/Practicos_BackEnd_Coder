import './chat.css'
import { ContextProvider } from "../../context/ContextProvider.jsx";
import { useContext, useEffect } from "react";

export const Chat = () => {
    const { newMessage, allMessages, percentage } = useContext( ContextProvider );

    return (
        <div className="container">
            <div className="d-flex align-items-center"><h2>MESSAGE CENTER</h2> <h4 className="p-4">Percentage Compressed
                : { percentage }%</h4></div>
            <div id="js-chatRoom" className="container">
                { allMessages && allMessages.map( el => {
                    const { username } = el.author
                    return (
                        <p key={ el.id }><span className="blue">{ username }</span> <span
                            className="red"> [{ el.timestamp }]</span>: { el.text }</p>
                    )
                } ) }
                { newMessage.map( el => {
                    const { username } = el.author
                    return (
                        <p key={ el.id }><span className="blue">{ username }</span> <span
                            className="red"> [{ el.timestamp }]</span>: { el.text }</p>
                    )
                } ) }
            </div>
        </div>
    )
}
