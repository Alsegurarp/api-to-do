//Crearemos todas las cosas de las que se encargará la base de datos

import dotenv from "dotenv";
dotenv.config();
import postgres from "postgres";

function conectar(){
    return postgres({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    })
}

//Crear consulta para leer las tareas - Function de rutina
export function leerTareas(){
    return new Promise(async (ok,ko) => {
        let conexion = conectar();
        try{
            let tareas = await conexion `SELECT * from tareas`;
            //Solamente estamos leyendo todo lo que se encuentre en /tareas - cortamos conexion
            conexion.end();
            ok(tareas);
        }
        catch(error){

            ko({error: "Error en el servidor"})
            //El rechazo debe de significar, error en base de datos - Pero al cliente dejarlo mas claro.

        }
    });
}
export function crearTareas(tarea, ){
    return new Promise(async (ok,ko) => {
        let conexion = conectar();
        try{
            let [{id}] = await conexion `INSERT into tareas (tarea) VALUES (${tarea}) RETURNING id `;
            //Linea de la consulta - Inser method en tareas(column en base de datos), cuyo valor es el que te he dado y returna el id
            conexion.end();

            ok(id);
        }
        catch(error){

            ko({error: "Error en el servidor"})
            //El rechazo debe de significar, error en base de datos - Pero al cliente dejarlo mas claro.

        }
    });
}
export function borrarTareas(id){
    return new Promise(async (ok,ko) => {
        let conexion = conectar();
        try{
            let {count} = await conexion `DELETE from tareas WHERE id = ${id}`;
            //Linea de la consulta - Inser method en tareas(column en base de datos), cuyo valor es el que te he dado y returna el id
            conexion.end();
            ok(count);
        }
        catch(error){
            console.log(error)
            ko({error: "Error en el servidor"})
            //El rechazo debe de significar, error en base de datos - Pero al cliente dejarlo mas claro.
        }
    });
}
borrarTareas(3)
.then(x => console.log(x))
.catch(x => console.log(x))