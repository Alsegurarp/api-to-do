import dotenv from "dotenv";
//Todas las cosas que yo utilice dependen de las variables de entorno.
dotenv.config(); //Lee el fichero .env y crea las variables de entorno - Esta leyendo que el puerto es el 4000 (Declarado en el fichero)
//--------
import express from "express";
import { leerTareas } from "./db.js";

const servidor = express();
//invocar express

servidor.use(express.json());

if(process.env.PRUEBAS){
    //Crear un middleware que sirva un fichero que estan en pruebas
    servidor.use(express.static("./pruebas"))
}
//En el caso de prueba al estar en linea, como nunca se sube las variables de estado - retorna undefined = false y aqui no pasa


servidor.get("/tareas", async (peticion, respuesta) => {
try{
    let tareas = await leerTareas();
    respuesta.json(tareas);
    //Una vez que tenga las tareas, las mando en JSON, porque vienen en formato Array de objeto.

}catch(error){
    respuesta.status(500);
    respuesta.json({error : "error en el servidor"})
}
})
//Si la URL es /tareas, entonces haré ésto.

servidor.post("/tareas/nueva", (peticion, respuesta) => {
console.log(peticion.body);
respuesta.send("sdjlskajdksal");
})






servidor.listen(process.env.PORT)
//Que se ponga a escuchar en el puerto que declaramos en .env