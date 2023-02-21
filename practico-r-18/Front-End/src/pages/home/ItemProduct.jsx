import './ItemProduct.css';

export const ItemProduct = ( { fakerProducts, setProduct } ) => {
    const { product, price, thumbnail } = fakerProducts

    return (
        <tr>
            <th scope="row">{ product }</th>
            <th scope="row">US ${ price }</th>
            <th scope="row"><img className="img-list" src={ thumbnail } alt={ product }/></th>
            <th scope="row">
                <button onClick={ () => setProduct(fakerProducts) } className="btn btn-primary">+</button>
            </th>
        </tr>
    )
}
