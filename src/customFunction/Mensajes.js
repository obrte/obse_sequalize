const switchError = (error, res) => {
    switch (error.details[0].context.key) {
        case 'id_organizacion':
            res.status(400).json({
                status: 'error',
                msg: 'Debe introducir la organizacion.'
            })
            break
        case 'id_instancia':
            res.status(400).json({
                status: 'error',
                msg: 'Debe introducir la instancia.'
            })
            break
        case 'id_ente':
            res.status(400).json({
                status: 'error',
                msg: 'Debe introducir el ente.'
            })
            break
        case 'id_uniadm':
            res.status(400).json({
                status: 'error',
                msg: 'Debe introducir la Unidad Administrativa'
            })
            break
        case 'nombre':
            res.status(400).json({
                status: 'error',
                msg: 'Debe introducir un nombre.'
            })
            break
        case 'email':
            res.status(400).json({
                status: 'error',
                msg: 'Debe introducir un correo.'
            })
            break
        case 'password':
            res.status(400).json({
                status: 'error',
                msg: 'Debe introducir un password.'
            })
            break
        case 'activo':
            res.status(400).json({
                status: 'error',
                msg: 'Debe proporcionar el campo activo.'
            })
            break
        case 'id_usuario_creacion':
            res.status(400).json({
                status: 'error',
                msg: 'Debe introducir un id_usuario_creacion.'
            })
            break
        case 'nombre_corto':
            res.status(400).json({
                status: 'error',
                msg: 'Debe introducir un nombre corto.'
            })
            break
        case 'origen':
            res.status(400).json({
                status: 'error',
                msg: 'Debe proporcionar el origen.'
            })
            break
        default:
            res.status(400).json({
                status: 'error',
                msg: 'No se encontraron un caso para este error.'
            })
            break
    }
}



const mensajes = {}

mensajes.switchError = switchError

module.exports = mensajes