/**
 * TODO: Trimer cada dato del body parse y convertirlo a MAYUSCULAS. LISTO
 * ! exepto el email.
 * TODO: Hacer todo lo del login y manejo de usuarios. LISTO
 * TODO: Todas las rutas deben ser protegidas, con excepción del login. LISTO
 * TODO: Hacer un middleware para decodificar el token que posee el usuario al momento de autenticar(JWT). LISTO
 
 * ! Crear un usuario directamente en la BD
 * *EJEMPLO
 "idUsuario": "09f53ea0-7a42-42e1-9b77-0d33d17698d7"
 "tipo": "SUPERADMIN"
 "idOrganizacion": "1",
 "idInstancia": "1",
 "idUniAdm": "1",
 "nombre": "SUPERADMIN",
 "email": "super@admin.com",
 "password": "$2b$10$tr4bhD1uPvwKO57ssSSzBe9BWoFlNrdec5t66DuZNsWgbdOMOGRLq", este password es "123"
 "activo": 1,
 "idUsuarioCreacion": null,
 "created_at": null,
 "updated_at": null,
 "organizacion": null,
 "instancia": null,
 "uniAdm": null



 * Hay una ruta /refrescar para actualizar el token
 * hay una ruta /token para mostrar los datos del token
 * en el archivo nodemon.json(en el raiz) esta el .env "JWT_KEY": "$3cr3t0"


 **/