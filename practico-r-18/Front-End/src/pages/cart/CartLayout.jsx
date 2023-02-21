import { DataUser } from "./DataUser";

export const CartLayout = ( { dataUser, cart, setCart } ) => {


    return (
        <>
            <DataUser dataUser={ dataUser }/>
            <tbody>
            { cart.map( el => {
                return (
                    <>
                        <tr className="p-4" key={ el.id }>
                            <td>
                                <img className="p-2" style={ { width: "5rem" } } src={ el.thumbnail }
                                     alt={ el.product }></img>
                            </td>
                            <td className="p-2">{ el.product }</td>
                            <td className="p-2">$USD { el.price }</td>
                        </tr>
                    </>

                )
            } ) }
            </tbody>
            { cart.length > 0 && <button onClick={ setCart } className="btn btn-primary">Finish Order</button> }

        </>
    )
};
