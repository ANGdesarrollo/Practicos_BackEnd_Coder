# Practico numero 16:

```
Front-End = Realizado con React JS
Back-End = Realizado con Node JS y express.

Para inicializar este trabajo:
De el lado de ngNix, entrar a la carpeta NginxNode/public y para incializar el fork junto con sus respectivos clusters utilizar el comando "npm start" .
De el lado del front-end utilizar: npm start.
Corroborar que el puerto en el que se inicia el Front-End sea el mismo que esta declarado en el .env (corsOrigin)

!!!!!!!IMPORTANTE!!!!!!! = 

Deje dos variables de entorno, una comentada con localhost y una descomentada con 127.0.0.1, si una no funciona probar con la otra, ya que a veces localhost genera conflicto =

#corsOrigin=http://127.0.0.1:5173  (modificar este puerto de ser necesario)
corsOrigin=http://localhost:5173 (modificar este puerto de ser necesario)
```

### Consigna 

Incorporar al proyecto de servidor de trabajo la compresión gzip.
Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro.

```
En las rutas =>

http://localhost:8080/api/info   => Se accede sin compresion
http://localhost:8080/api/info/gzip => Se accede con compresion

De el lado de el front-end cambié el pedido https de api/info a api/info/gzip para utilizar el metodo comprimido
```

### Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente: Ruta y método de todas las peticiones recibidas por el servidor (info) Ruta y método de las peticiones a rutas inexistentes en el servidor (warning) Errores lanzados por las apis de mensajes y productos, únicamente (error) Considerar el siguiente criterio: Loggear todos los niveles a consola (info, warning y error) Registrar sólo los logs de warning a un archivo llamada warn.log Enviar sólo los logs de error a un archivo llamada error.log

```
Se instalo el packete de winston y se creo en la carpeta utils un archivo de configuracion de winston 
y se exporto para poder utilizarse como reemplazo al console.log. Se utilizo en controladores, containers, y configuraciones de
servidores.
------------------------------------------------------------------------------

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console({ level: 'info' }),
        new transports.File({ filename: 'warn.log', level: 'warn' }),
        new transports.File({ filename: 'error.log', level: 'error' })
    ]
});

module.exports = logger;

```

### Perfilamiento del servidor con Artillery utilizando console.log en la ruta /api/info

```
http.codes.200: ................................................................ 1000
http.request_rate: ............................................................. 745/sec
http.requests: ................................................................. 997
http.response_time:
  min: ......................................................................... 4
  max: ......................................................................... 67
  median: ...................................................................... 25.8
  p95: ......................................................................... 41.7
  p99: ......................................................................... 49.9
http.responses: ................................................................ 1000
vusers.completed: .............................................................. 50
vusers.created: ................................................................ 47
vusers.created_by_name.0: ...................................................... 47
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 373.4
  max: ......................................................................... 634.2
  median: ...................................................................... 561.2
  p95: ......................................................................... 632.8
  p99: ......................................................................... 632.8


All VUs finished. Total time: 3 seconds

--------------------------------
Summary report @ 17:55:43(-0300)
--------------------------------

http.codes.200: ................................................................ 1000
http.request_rate: ............................................................. 374/sec
http.requests: ................................................................. 1000
http.response_time:
  min: ......................................................................... 4
  max: ......................................................................... 67
  median: ...................................................................... 25.8
  p95: ......................................................................... 41.7
  p99: ......................................................................... 49.9
http.responses: ................................................................ 1000
vusers.completed: .............................................................. 50
vusers.created: ................................................................ 50
vusers.created_by_name.0: ...................................................... 50
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 373.4
  max: ......................................................................... 634.2
  median: ...................................................................... 561.2
  p95: ......................................................................... 632.8
  p99: ......................................................................... 632.8
```

### Perfilamiento del servidor con Artillery sin console.log en la ruta /api/info

```
--------------------------------------
Metrics for period to: 17:53:20(-0300) (width: 1.203s)
--------------------------------------

http.codes.200: ................................................................ 1000
http.request_rate: ............................................................. 842/sec
http.requests: ................................................................. 1000
http.response_time:
  min: ......................................................................... 1
  max: ......................................................................... 45
  median: ...................................................................... 16
  p95: ......................................................................... 24.8
  p99: ......................................................................... 29.1
http.responses: ................................................................ 1000
vusers.completed: .............................................................. 50
vusers.created: ................................................................ 50
vusers.created_by_name.0: ...................................................... 50
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 137.6
  max: ......................................................................... 400.1
  median: ...................................................................... 347.3
  p95: ......................................................................... 391.6
  p99: ......................................................................... 391.6


All VUs finished. Total time: 3 seconds

--------------------------------
Summary report @ 17:53:13(-0300)
--------------------------------

http.codes.200: ................................................................ 1000
http.request_rate: ............................................................. 842/sec
http.requests: ................................................................. 1000
http.response_time:
  min: ......................................................................... 1
  max: ......................................................................... 45
  median: ...................................................................... 16
  p95: ......................................................................... 24.8
  p99: ......................................................................... 29.1
http.responses: ................................................................ 1000
vusers.completed: .............................................................. 50
vusers.created: ................................................................ 50
vusers.created_by_name.0: ...................................................... 50
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 137.6
  max: ......................................................................... 400.1
  median: ...................................................................... 347.3
  p95: ......................................................................... 391.6
  p99: ......................................................................... 391.6
```

### Sumario de node --prof con console.log

```
[Shared libraries]:
ticks  total  nonlib   name
9923   76.8%          C:\Windows\SYSTEM32\ntdll.dll
2888   22.3%          C:\Program Files\nodejs\node.exe
13    0.1%          C:\Windows\System32\KERNELBASE.dll
2    0.0%          C:\Windows\System32\KERNEL32.DLL
```

### Sumario de node --prof sin console.log

```
 [Summary]:
   ticks  total  nonlib   name
     99    0.9%  100.0%  JavaScript
      0    0.0%    0.0%  C++
     52    0.5%   52.5%  GC
  11095   99.1%          Shared libraries
```

### Sumario de Autocanon

```
┌─────────┬───────┬────────┬────────┬────────┬───────────┬─────────┬────────┐
│ Stat    │ 2.5%  │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev   │ Max    │
├─────────┼───────┼────────┼────────┼────────┼───────────┼─────────┼────────┤
│ Latency │ 33 ms │ 112 ms │ 156 ms │ 177 ms │ 107.84 ms │ 28.2 ms │ 240 ms │
└─────────┴───────┴────────┴────────┴────────┴───────────┴─────────┴────────┘
┌───────────┬────────┬────────┬────────┬────────┬────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg    │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼────────┼────────┼─────────┼────────┤
│ Req/Sec   │ 695    │ 695    │ 943    │ 976    │ 920.9  │ 63      │ 695    │
├───────────┼────────┼────────┼────────┼────────┼────────┼─────────┼────────┤
│ Bytes/Sec │ 508 kB │ 508 kB │ 690 kB │ 714 kB │ 673 kB │ 46.2 kB │ 508 kB │
└───────────┴────────┴────────┴────────┴────────┴────────┴─────────┴────────┘

Req/Bytes counts sampled once per second.
# of samples: 20

19k requests in 20.06s, 13.5 MB read
```

### Sumario de GoogleChrome

<img src="https://res.cloudinary.com/dwz16rstr/image/upload/v1675812632/fotro_m52ffx.png" width="500">

### Grafico Flama

<img src="https://res.cloudinary.com/dwz16rstr/image/upload/v1675813911/flame_scaiyp.png" width="500">


