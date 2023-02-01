# Practico numero 14:

```
Front-End = Realizado con React JS
Back-End = Realizado con Node JS y express.

Para inicializar este trabajo:
De el lado del servidor utilizar: npm start.
De el lado del front-end utilizar: npm start.
Corroborar que el puerto en el que se inicia el Front-End sea el mismo que esta declarado en el .env (corsOrigin)

!!!!!!!IMPORTANTE!!!!!!! = 

Deje dos variables de entorno, una comentada con localhost y una descomentada con 127.0.0.1, si una no funciona probar con la otra, ya que a veces localhost genera conflicto =

corsOrigin=http://127.0.0.1:5173
#corsOrigin=http://localhost:5173
```

### Consigna 1

Sobre el proyecto del último desafío entregable, mover todas las claves y credenciales utilizadas a un
archivo .env, y cargarlo mediante la librería dotenv.
La única configuración que no va a ser manejada con esta librería va a ser el puerto de escucha del
servidor. Éste deberá ser leído de los argumento pasados por línea de comando, usando alguna librería
(minimist o yargs). En el caso de no pasar este parámetro por línea de comandos, conectar por defecto al
puerto 8080.
Observación: por el momento se puede dejar la elección de sesión y de persistencia explicitada en el
código mismo. Más adelante haremos también parametrizable esta configuración.

```
Las variables .env se encuentran en la carpeta enviroments. Y la configuracion del PUERTO se hizo con Minimist
```


### Consigna 2

Agregar una ruta '/info' que presente en una vista sencilla los siguientes datos:
- Argumentos de entrada - Path de ejecución
- Nombre de la plataforma (sistema operativo) - Process id
- Versión de node.js - Carpeta del proyecto
- Memoria total reservada (rss)

```
Se creo en el front-end una vista llamada INFO donde se muestran todos los datos solicitados.
```


### Consigna 3

Agregar otra ruta '/api/randoms' que permita calcular un cantidad de números aleatorios
en el rango del 1 al 1000 especificada por parámetros de consulta (query).
Por ej: /randoms?cant=20000.
Si dicho parámetro no se ingresa, calcular 100.000.000 números.
El dato devuelto al frontend será un objeto que contendrá como claves los números
random generados junto a la cantidad de veces que salió cada uno. Esta ruta no será
bloqueante (utilizar el método fork de child process). Comprobar el no bloqueo con una
cantidad de 500.000.000 de randoms.
Observación: utilizar routers y apis separadas para esta funcionalidad.

```
Se creo en el front-end una vista llamada GET RANDOMS que genera un numero aleatorio entre 0 y 1000, se toman los datos de la url y se las manda al backend con Axios por metodo POST. Se utiliza child process con fork.
```
