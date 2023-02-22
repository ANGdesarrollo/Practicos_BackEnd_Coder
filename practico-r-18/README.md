# Pre entrega final 3:

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

### 1) Un menú de registro y autenticación de usuarios basado en passport local, guardando en la base de datos las credenciales y el resto de los datos ingresados al momento del registro.

##### 1-A) El registro de usuario consiste en crear una cuenta en el servidor almacenada en la base de datos, que contenga el email y password de usuario, además de su nombre, dirección, edad, número de teléfono (debe contener todos los prefijos internacionales) y foto ó avatar. La contraseña se almacenará encriptada en la base de datos.

```
En el menu de registro se piden todos los datos solicitados, al registrarse, todas las verificaciones se dan mediante el middleware
que otorga passport utilizando un modelo de mongoose, finalmente, se hashea el pw del usuario.
Para los prefijos internacionales, utilice una libreria en React JS llamada "react-intl-tel-input"

Logica de BCRYPT, PASSPORT Y MOGNOOSE = 
// MIDDLEWARE PASSPORT.
exports.passportLocalRegister = new LocalStrategy( {
        passReqToCallback: true,
    },
    ( req, username, password, done, res ) => {
        {User.findOne( { 'username': username }, function
            ( err, user ) {
            const { body } = req;
            if ( err ) {
                logger.info( 'error', `${ err }` )
                return done( err );
            }
            if ( user ) {
                logger.info( 'warn', `User already exists` )

                return done( null, false )
            }
            const newUser = {            // MODELO DE MONGOOSE
                name: body.name,
                address: body.address,
                age: body.age,
                phone: body.phoneNumber,
                avatar: body.avatar,
                username: username,
                password: createHash( password ), // BCRYPT
            }
            logger.info( 'info', newUser )
            User.create( newUser, ( err, userWithId ) => {
                if ( err ) {
                    logger.info( 'error', `${ err }` )
                    return done( err );
                }
                logger.info( 'info', user  )
                logger.info( 'info', 'User Registration successful' )
                return done( null, userWithId );
            } );
        } );}
    }
)
```

##### 1-B) La imagen se podrá subir al servidor y se guardará en una carpeta pública del mismo a la cual se tenga acceso por url (* si no pueden lograrlo pongan directo el http url de la foto).

```
En este item, directamente se guarda el URL de la foto ingresada por el usuario en la base de datos.
```

### 2) Un formulario post de registro y uno de login. De modo que, luego de concretarse cualquiera de estas operaciones en forma exitosa, el usuario accederá a su home.

##### 2-A) El usuario se logueará al sistema con email y password y tendrá acceso a un menú en su vista, a modo de barra de navegación. Esto le permitirá ver los productos totales con los filtros que se hayan implementado (*podriamos llegar a no tener filtros si se les complica mucho, idealmente por lo menos filto por categoria) y su propio carrito de compras e información propia del ususario (dato del usuario y foto). Además, dispondrá de una opción para desloguearse del sistema.

```
Una vez logueado el usuario, se encontrara en una vista con todos los productos disponibles, en el mismo se encuentra un filtro para ordenar
los precios de menor a mayor, el usuario puede agregar productos al carrito. Luego en el menu de navegacion se encuentra un carrito que al clikearlo, se muestra
la vista con su informacion personal y los productos comprados. El metodo de deslogueo se encuentra en el nav de manera "global"
```

##### 2-B) Ante la incorporación de un usuario, el servidor enviará un email al administrador con todos los datos de registro y asunto 'nuevo registro', a una dirección que se encuentre por el momento almacenada en una constante global.

```
Al registrarse un usuario, utilice nodemailer para que me llegue un mensaje a mi correo electronico. La contraseña de nodemailer se encuentra en .env

Logica: 

"use strict";
const nodemailer = require( "nodemailer" );
const logger = require( "../winstonLogger/winstonLogger" );
const emailOwner = 'alexisgraff123@gmail.com'

const email = async ( body, subject ) => {
    let transporter = nodemailer.createTransport( {
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: emailOwner,
            pass: process.env.PASS_NODEMAILER,
        },
    } );

    let info = await transporter.sendMail( {
        from: '"Alexis Graff 👻" <foo@example.com>', // sender address
        to: emailOwner, // list of receivers
        subject: `${ subject } ✔`, // Subject line
        text: 'New user registered', // plain text body
        html: `${ body }`, // html body
    } );
    logger.info(`Message sent: %s ${info.messageId}` )
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}


module.exports = {
    email
}

```
Ejemplo de como me llega al email = 

<img src="https://res.cloudinary.com/dwz16rstr/image/upload/v1677093473/tercer-entrega-final/Nuevo_registro_todqxx.png" width="500">

### 3) Envío de un email y un mensaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global.

##### 3-A) El usuario iniciará la acción de pedido en la vista del carrito.
##### 3-B) Será enviado una vez finalizada la elección para la realizar la compra de productos.

```
Se creó un boton en la vista del carrito para iniciar el pedido de compra. Este boton solo aparece si hay al menos 1 elemento en el carrito.
```

##### 3-C) El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto la frase 'nuevo pedido de ' y el nombre y email del usuario que los solicitó. En el mensaje de whatsapp se debe enviar la misma información del asunto del email.

```
Para este paso se autorizo mi numero telefonico en Twilio y se uso nodemailer para que me llegue el pedido.

La logica utilizada en nodemailer es la misma que la mostrada anteriormente en el punto 2-B del README.
La logica de wsp twilio es la siguiente = (El account SID y el AUTHToken se encuentran en el .env)

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_TOKEN;
const client = require( 'twilio' )( accountSid, authToken );

const twilioWA = ( body ) => {
    client.messages
        .create({
            body: body,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5492915343707'
        })
        .then(message => console.log(message.sid))

}

module.exports = {
    twilioWA
}

```

Foto de como me llegan los E-MAILS de pedidos = Se que esto podria mejorarse a la vista, pero de manera practica lo deje de esta manera.

<img src="https://res.cloudinary.com/dwz16rstr/image/upload/v1677095247/tercer-entrega-final/Pedido_Email_xvuqyg.png" width="500">

Foto de como me llegan los WSP de pedidos =
<img src="https://res.cloudinary.com/dwz16rstr/image/upload/v1677095247/tercer-entrega-final/Pedido_Wsp_lnl55s.png" width="500">


##### 3-D) El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido ha sido recibido y se encuentra en proceso.

```
Debido a que para verificar a un usuario desde el codigo de node JS (es decir su numero telefonico) te piden la cuenta premium
simplemente utilice mi numero de telefono para que me llegue el mensaje.

Logica de el codigo de mensajes con Twilio:

const dotenv = require( "dotenv" );
const { config } = dotenv;
config( { path: './enviroment/.env' } );
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_TOKEN;
const client = require( 'twilio' )( accountSid, authToken );

const TwilioMsg = async ( body ) => {
    await client.messages
        .create( {
            body: body,
            from: '+12705143682',
            to: '+542915343707'
        } );
}


module.exports = {
    TwilioMsg
}
```

Foto de como me llega el mensaje de Texto = 

<img src="https://res.cloudinary.com/dwz16rstr/image/upload/v1677095600/tercer-entrega-final/Confirmacion_de_pedido_fnqra0.jpg" width="500">


## Aspectos a incluir: 

### A) El servidor trabajará con una base de datos DBaaS (Ej. MongoDB Atlas) y estará preparado para trabajar en forma local o en la nube a través de la plataforma PaaS Heroku/Railway/AWS.

```
El backend es utilizado con MongoAtlas.
```

### B) Habilitar el modo cluster para el servidor, como opcional a través de una constante global (*opcional).

```
Utilizando npm dev para iniciar el servidor, se abren todos los clusters posibles. Utilizando npm start se abre con nodemon.
```

### C) Utilizar alguno de los loggers ya vistos y así reemplazar todos los mensajes a consola por logs eficientes hacia la misma consola. En el caso de errores moderados o graves el log tendrá además como destino un archivo elegido.

```
Se utiliza Winston como logger.
```

### D) Realizar una prueba de performance en modo local, con y sin cluster, utilizando Artillery en el endpoint del listado de productos (con el usuario vez logueado). Verificar los resultados (*opcional).

```
Este punto era opcional y no lo realicé
```
