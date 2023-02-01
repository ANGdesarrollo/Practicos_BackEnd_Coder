# Practico numero 15:

```
Front-End = Realizado con React JS
Back-End = Realizado con Node JS y express.

Para inicializar este trabajo:
De el lado de ngNix, entrar a la carpeta NginxNode/public y para incializar el fork junto con sus respectivos clusters utilizar el comando "npm start" .
De el lado del front-end utilizar: npm start.
Corroborar que el puerto en el que se inicia el Front-End sea el mismo que esta declarado en el .env (corsOrigin)

!!!!!!!IMPORTANTE!!!!!!! = 

Deje dos variables de entorno, una comentada con localhost y una descomentada con 127.0.0.1, si una no funciona probar con la otra, ya que a veces localhost genera conflicto =

corsOrigin=http://127.0.0.1:5173
#corsOrigin=http://localhost:5173
```

### Consigna 1

Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus
modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
● Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del
código del servidor se vea reflejado inmediatamente en todos los procesos.
● Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.


### Consigna 2

Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:

Las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4
instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

