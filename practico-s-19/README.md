# Entrega 19

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

Dividir en capas el proyecto entregable con el que venimos trabajando (entregable clase 16: loggers y profilers), agrupando apropiadamente las capas de ruteo, controlador, lógica de negocio y persistencia.

Considerar agrupar las rutas por funcionalidad, con sus controladores, lógica de negocio con los casos de uso, y capa de persistencia.

La capa de persistencia contendrá los métodos necesarios para atender la interacción de la lógica de negocio con los propios datos.

Routes =  

<img src="https://res.cloudinary.com/dwz16rstr/image/upload/v1677794834/Routes_qjltit.png" width="500">

Controllers = 

<img src="https://res.cloudinary.com/dwz16rstr/image/upload/v1677794834/Controllers_ctwjop.png" width="500">

Services = 

<img src="https://res.cloudinary.com/dwz16rstr/image/upload/v1677794834/Services_gbpvor.png" width="500">

DB = 

<img src="https://res.cloudinary.com/dwz16rstr/image/upload/v1677794834/db_nuer8u.png" width="500">


La parte de la DB me parecio que usar las DAOS era lo mas correcto, en caso de estar equivocado hacemelo saber !

Muchas gracias

