import dotenv from "dotenv";
//Todas las cosas que yo utilice dependen de las variables de entorno.
dotenv.config(); //Lee el fichero .env y crea las variables de entorno - Esta leyendo que el puerto es el 4000 (Declarado en el fichero)
//--------
import express, { response } from "express";
import { leerTareas, crearTareas, borrarTareas, editarTareas, editarEstado } from "./db.js";

const servidor = express();
//invocar express

servidor.use((peticion, respuesta, siguiente) => 
    {console.log("entramos al middleware");
    siguiente();
   //Entro al middleware, hago lo que debo de hacer pero no respondo, sino respondo entonces el proceso no ha terminado
   //Una vez que he terminado debo invocar la function siguiente() - Una vez que termine te sales del middleware
})

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

servidor.post("/tareas/nueva", async (peticion, respuesta, siguiente) => {
let {tarea} = peticion.body;
//Si peticion.body contiene algo, entonces pasa
if(!tarea || tarea.trim() == ""){
    return siguiente(true)
}
try{
    let id = await crearTareas(tarea);
    //tarea viene del cuerpo de la peticion que fue enviada
    respuesta.json({id});
    //Estamos mandando un objeto con la propiedad 'id'
}catch(error){
    respuesta.status(500);
    respuesta.json({error : "Error en el servidor"})
}
})
//Al nosotros tener un parametro en el id - Se puede validar con REGEX - 
servidor.delete("/tareas/borrar/:id([0-9]+)", async (peticion, respuesta) => {
        try{
            let id = Number(peticion.params.id);
            let count = await borrarTareas(id);
            respuesta.json() = {resultado : count ? "ok" : "ko"}} 
            catch(error){
            respuesta.status(500);
            respuesta.json({error : "Error en el servidor"})
            }
    
    //Haces una peticion con delete y despues te debe de responder esto
    //.params.id para que el servidor pueda leer el contenido que es dinámico.
})

servidor.use((error, peticion, respuesta, siguiente) => {
    respuesta.status(400);
    respuesta.json({error : "error en la peticion "});
});
//Middleware de gestor de errores - 

//Creacion de ultimo middleware, incluso despues del ERROR 
//Sin ninguna url - Si llega aqui, el recurso no existe, error 404
servidor.use((peticion, respuesta) => {
    respuesta.status(404);
    respuesta.json({error : "Recurso no encontrado"});
})




servidor.listen(process.env.PORT)
//Que se ponga a escuchar en el puerto que declaramos en .env