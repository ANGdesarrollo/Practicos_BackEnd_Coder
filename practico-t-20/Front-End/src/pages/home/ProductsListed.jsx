import { ItemProduct } from "./ItemProduct.jsx";
import { useContext, useEffect } from "react";
import { ContextProvider } from "../../context/ContextProvider.jsx";

export const ProductsListed = () => {

    const { isLoading, allProducts, setProduct, orderProducts } = useContext( ContextProvider );


    return (
        <div className="container">
            { isLoading ? <div>Loading</div> :
                <>
                    <button onClick={ orderProducts }>Order by price</button>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Img</th>
                            <th scope="col">Buy</th>
                        </tr>
                        </thead>
                        <tbody id="js-allProducts">
                        { allProducts.length > 0 && allProducts.map( ( el, i ) => {
                            return (
                                <ItemProduct key={ i * Math.random() }
                                             fakerProducts={ el }
                                             setProduct={ setProduct }
                                >
                                </ItemProduct>
                            )
                        } ) })
                        </tbody>
                    </table>
                </>
            }
        </div>
    )
}
