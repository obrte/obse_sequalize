const switchError = (error, res) => {
    switch (error.details[0].context.key) {
        case 'id_organizacion':
            res.status(400).json({
                status: 'error',
                msg: 'Debe introducir la organizacion.'
            })
            break
        case 'nombre':
            res.status(400).json({
                status: 'error',
                msg: 'Debe introducir un nombre.'
            })
            break
        case 'activo':
            res.status(400).json({
                status: 'error',
                msg: 'Debe proporcionar el campo activo.'
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