# Entrega 20

```
Front-End = Realizado con React JS
Back-End = Realizado con Node JS y express.

Para inicializar este trabajo:
De el lado de ngNix, entrar a la carpeta NginxNode/public y para incializar el fork junto con sus respectivos clusters utilizar el comando "npm dev", para inicializarlo con nodemon utilizar "npm start" .
De el lado del front-end utilizar: npm start.
Corroborar que el puerto en el que se inicia el Front-End sea el mismo que esta declarado en el .env (corsOrigin)

!!!!!!!IMPORTANTE!!!!!!! = 

Deje dos variables de entorno, una comentada con localhost y una descomentada con 127.0.0.1, si una no funciona probar con la otra, ya que a veces localhost genera conflicto =

#corsOrigin=http://127.0.0.1:5173  (modificar este puerto de ser necesario)
corsOrigin=http://localhost:5173 (modificar este puerto de ser necesario)
```

## Consigna 

### Modificar la capa de persistencia incorporando los conceptos de Abstract Factory y DAO.

Continue utilizando los containers y la extension de clases para este punto.
De esta manera puedo aplicar la logica del container a cualquier modelo sin repetir codigo.
```
const CrudServiceFirebase = require( "../../container/firebaseContainer" );
const UserModel = require( "../../models/user" );
const CrudServiceMongo = require( "../../container/mongoContainer" );

let User;
let mode = process.env.DB

if ( mode === 'mongo' ) {
    class UserDaosModel extends CrudServiceMongo {
        constructor() {
            super( UserModel );
        }
    }
    User = new UserDaosModel();
}

if ( mode === 'firebase' ) {
    class UserDaosModel extends CrudServiceFirebase {
        constructor() {
            super( UserModel );
        }
    }
    User = new UserDaosModel();
}

if (!mode) {
    throw new Error('No database Selected')
}

module.exports = User;
```

### Los DAOs deben presentar exactamente la misma interfaz hacia la lógica de negocio.

Utilice exactamente los mismos metodos tanto en Firebase como en Mongo DB.

Container de Firebase = 
```
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

```

Container MongoDB = 

```
const { mongoDB } = require( "../database/config/configMongo" );

mongoDB.getInstance();

class CrudServiceMongo {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const item = await this.model.create(data);
            return item;
        } catch (error) {
            throw new Error(`Error creating item: ${error}`);
        }
    }

    async read(id) {
        try {
            const item = await this.model.findById(id);
            if (!item) {
                throw new Error(`Item not found`);
            }
            return item;
        } catch (error) {
            throw new Error(`Error reading item: ${error}`);
        }
    }

    async update(id, data) {
        try {
            const item = await this.model.findByIdAndUpdate(id, data, { new: true });
            if (!item) {
                throw new Error(`Item not found`);
            }
            return item;
        } catch (error) {
            throw new Error(`Error updating item: ${error}`);
        }
    }

    async delete(id) {
        try {
            const item = await this.model.findByIdAndDelete(id);
            if (!item) {
                throw new Error(`Item not found`);
            }
            return item;
        } catch (error) {
            throw new Error(`Error deleting item: ${error}`);
        }
    }

    async list(filter) {
        try {
            const items = await this.model.find(filter);
            return items;
        } catch (error) {
            throw new Error(`Error listing items: ${error}`);
        }
    }
}

module.exports = CrudServiceMongo;
```

### Cada uno de estos casos de persistencia (*elegir al menos dos para hacer la prueba, por ejemplo archivo/mongo o memoria/mongo o mongo/firebase) deberán ser implementados usando el patrón singleton que impida crear nuevas instancias de estos mecanismos de acceso a los datos.

El patron singleton se invoca al inicio de cada container mostrado anteriormente, la logica utilizada es la siguiente =

Firebase:

```
const admin = require( 'firebase-admin' );
const { certFirebase } = require( "./certFirebase" );
const { config } = require( "dotenv" );
const { getFirestore } = require( "firebase-admin/firestore" );
const logger = require( "../../utils/winstonLogger/winstonLogger" );

config( { path: './environment/.env' } );

const firebaseDB = class Database {
    static instance = null;

    constructor() {
        try {
            if(process.env.DB === 'firebase') {
                admin.initializeApp( {
                    credential: admin.credential.cert( certFirebase )
                } );
                logger.info('Firebase Online')
                return getFirestore();
            }

        } catch ( err ) {
            throw new Error( 'Error to initialize Firebase' );
        }
    }

    static getInstance() {
        if ( !Database.instance ) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

module.exports = firebaseDB;

```

MongoDB:

```
const session = require( "express-session" );
const MongoStore = require( "connect-mongo" );
const mongoose = require( "mongoose" );
const logger = require( "../../utils/winstonLogger/winstonLogger" );
const connect = mongoose.connect;

mongoose.set( 'strictQuery', true )

exports.mongoDB =  class Database {
    static instance = null;
    constructor() {
        try {
            if(process.env.DB === 'mongo') {
                connect( process.env.DB_CNN_MONGO, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                } )
                logger.log( 'info', "MongoServer online" )
            }
        } catch ( err ) {
            logger.info( 'error', `${ err }` )
            throw new Error( 'Error to initialize MongoDB' );
        }
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
```

### Comprobar que si llamo a la factory dos veces, con una misma opción elegida, devuelva la misma instancia (*patrón singleton).

Al elegir en el process.env "mongo" me llama a la factory solo una vez y la db se conecta solo una vez

Foto de el console.log iniciando con Mongo = 

<img src="https://res.cloudinary.com/dwz16rstr/image/upload/v1678374428/mongo_picture_xxtxbk.png" width="500">

Foto de el console.log iniciando con Firebase = 

<img src="https://res.cloudinary.com/dwz16rstr/image/upload/v1678374428/firebase_picture_gbpn1a.png" width="500">
