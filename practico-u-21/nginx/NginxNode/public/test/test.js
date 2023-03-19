const request = require( 'supertest' )( 'http://localhost:8080' );
const expect = require( 'chai' ).expect;
const faker = require( '@faker-js/faker' ).faker;

const generateProduct = () => {
    return {
        name: faker.commerce.productName(),
        date: faker.commerce.productName(),
        thumbnail: faker.image.imageUrl(),
        price: faker.commerce.price()
    }
}

describe( 'test all endpoints', () => {
    describe( 'GET ALL', () => {
        it( 'It should return status 200 and be an array', async () => {
            const res = await request.get( '/api/products' );
            expect( res.status ).to.eql( 200 );
            expect( res.body ).to.be.a( 'object' );
        } )
    } );

    describe( 'POST', () => {
        it( 'It should be a new post', async () => {
            const product = generateProduct();
            const res = await request.post( '/api/products' ).send( product )
            expect( res.status ).to.eql( 201);
            expect( res.body ).to.be.a( 'object' );
            expect( res.body ).to.include.keys('message', 'status');
        } )
    } )
} )


