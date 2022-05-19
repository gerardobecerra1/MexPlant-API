#MexPlant-API

Recuerda que debes ejecutar `npm install` para reconstruir los modulos de Node.

1.- Creamos carpeta con el nombre que queremos para la api y ejecutamos el comando `npm init -y` en la terminal desde Visual Studio Code.

2.Instalamos "express" para crear las rutas de la aplicación y "dotenv" para crear las varibales de entorno locales necesarias para conectarnos a la base de datos o información necesaria que no debe ver el publico, con `npm i express dotenv` en la misma terminal.

3.-Instalamos "cors" para que a nuestra API podamos dar acceso solo a ciertas personas o a todo el mundo o bien para que los navegadores no tomen la pagína como desconfiable, con el comando `npm i cors`.

4.-Instalamos "mogoose" para que a nuestra API pueda conectarse y hacer un CRUD para nuestra RESTAPI, con el comando `npm i mongoose`.

5.-Instalamos "bcryptjs" para que a nuestra API pueda encriptar campos como el password, con el comando `npm i bcryptjs`.

6.-Instalamos "express-validator" para que a nuestra API valide campos con el formato correcto como el correo, con el comando `npm i express-validator`.

7.-Instalamos "jsonwebtoken" para que a nuestra API valide quien puede hacer ciertas tareas con mayor seguridad, con el comando `npm i jsonwebtoken`.