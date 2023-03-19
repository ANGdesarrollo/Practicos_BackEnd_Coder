const firebaseDB = require( "../database/config/configFirebase" );

firebaseDB.getInstance();
const db = firebaseDB;

class CrudServiceFirebase {
    constructor( model ) {
        this.model = model;
        this.db = db;
    }

    async getAll() {
        try {
            const allProducts = [];
            const snapshot = await this.db.model( this.model ).get();
            snapshot.forEach( ( doc ) => {
                const document = { ...doc.data(), id: doc.id }
                allProducts.push( document )
            } )
            return allProducts;
        } catch ( err ) {
            throw new Error( 'Firebase DB Error' );
        }
    };



    async create( item ) {
        try {
            await this.db.model( this.model ).add( item );
            return item
        } catch ( err ) {
            throw new Error( 'Firebase DB Error' );
        }
    }

    async read( id ) {
        try {
            const allItems = await this.getAll();
            const findItem = allItems.find( el => el.id === id );
            if ( findItem !== undefined ) {
                return findItem
            } else {
                return undefined
            }
        } catch ( err ) {
            throw new Error( 'Firebase DB Error' );
        }
    }


    async update( id, body ) {
        try {
            const allItems = await this.getAll();
            const findItem = allItems.find( el => el.id === id );
            if ( findItem !== undefined ) {
                const updatedItem = { ...findItem, ...body }
                await this.db.model( this.model ).doc( id ).set( updatedItem )
                return updatedItem
            } else {
                return undefined
            }
        } catch ( err ) {
            throw new Error( 'Firebase DB Error' );
        }
    };


    async delete(id) {
        try {
            const allItems = await this.getAll();
            const findItem = allItems.find(el => el.id === id);
            if (findItem !== undefined) {
                await db.model(this.model).doc(id).delete();
                return findItem;
            } else {
                return undefined;
            }
        } catch (err) {
            throw new Error('Firebase DB Error');
        }
    };

    async list( filter ) {
        try {
            const items = await this.model.find( filter );
            return items;
        } catch ( error ) {
            throw new Error( `Error listing items: ${ error }` );
        }
    }
}

module.exports = CrudServiceFirebase;
