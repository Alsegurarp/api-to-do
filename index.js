import dotenv from "dotenv";
//Todas las cosas que yo utilice dependen de las variables de entorno.
dotenv.config(); //Lee el fichero .env y crea las variables de entorno - Esta leyendo que el puerto es el 4000 (Declarado en el fichero)
//--------

import express from "express";



const servidor = express();
//invocar express









servidor.listen(process.env.PORT)
//Que se ponga a escuchar en el puerto que declaramos en .env