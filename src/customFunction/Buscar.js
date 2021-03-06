const db = require('../config/db')
//const Op = db.Sequelize.Op

//Regresa todos los datos del ID encontrado
const organizacion = id => {
	return new Promise((resolve, reject) => {
		db.catOrganizaciones
			.find({
				where: {
					idOrganizacion: id
				}
			})
			.then(datos => {
				if (datos) {
					resolve(datos)
				} else {
					reject('no existe')
				}
			})
	})
}

const ente = id => {
	return new Promise((resolve, reject) => {
		db.catEntesFiscalizadores
			.find({
				where: {
					idEnte: id
				},
				include: [{
					model: db.catOrganizaciones,
					attributes: ['nombre'],
					as: 'organizacion'
				}]
			})
			.then(ente => {
				resolve(ente)
			})
			.catch(err => reject(err))
	})
}

const fondo = id => {
	return new Promise((resolve, reject) => {
		db.catFondos
			.find({
				where: {
					idFondo: id
				},
				include: [{
					model: db.catOrganizaciones,
					attributes: ['nombre'],
					as: 'organizacion'
				}]
			})
			.then(fondo => {
				resolve(fondo)
			})
			.catch(err => reject(err))
	})
}

const instancia = id => {
	return new Promise((resolve, reject) => {
		db.catInstancias
			.find({
				where: {
					idInstancia: id
				},
				include: [{
					model: db.catInstanciaEntes,
					as: 'entes',
					include: [{
						model: db.catEntesFiscalizadores,
						as: 'ente'
					}]
				},
				{
					model: db.catInstanciaFondos,
					as: 'fondos',
					include: [{
						model: db.catFondos,
						as: 'fondo'
					}]
				},
				{
					model: db.catOrganizaciones,
					attributes: ['nombre', 'nombreCorto'],
					as: 'organizacion'
				}
				]
			})
			.then(instancia => {
				resolve(instancia)
			})
			.catch(err => reject(err))
	})
}

const uniAdm = id => {
	return new Promise((resolve, reject) => {
		db.catUniAdm
			.find({
				where: {
					idUniAdm: id
				},
				include: [{
					model: db.catInstancias,
					attributes: ['nombre', 'idOrganizacion'],
					as: 'instancia'
				}]
			})
			.then(uniAdm => {
				resolve(uniAdm)
			})
			.catch(err => reject(err))
	})
}

const usuario = id => {
	return new Promise((resolve, reject) => {
		db.catUsuarios
			.find({
				where: {
					idUsuario: id
				},
				attributes: [
					'idUsuario',
					'tipo',
					'nombre',
					'email',
					'activo',
					'created_at',
					'updated_at'
				],
				include: [{
					model: db.catOrganizaciones,
					attributes: ['idOrganizacion', 'nombre'],
					as: 'organizacion'
				},
				{
					model: db.catInstancias,
					attributes: ['idInstancia', 'nombre'],
					as: 'instancia'
				},
				{
					model: db.catUniAdm,
					attributes: ['idUniAdm', 'nombre'],
					as: 'uniAdm'
				},
				{
					model: db.catUsuarios,
					attributes: ['idUsuarioCreacion', 'nombre'],
					as: 'creador'
				}
				]
			})
			.then(datos => {
				if (datos) {
					resolve(datos)
				} else {
					resolve(false)
				}
			})
			.catch(err => reject(err))
	})
}

const informe = id => {
	return new Promise((resolve, reject) => {
		db.informes.find({
			where: {
				idInforme: id
			},
			attributes: [
				'idInforme',
				'nombre',
				'ejercicio',
				'delMes',
				'alMes',
				'numero',
				'numeroAuditoria',
				'activo',
				'created_at',
				'updated_at'
			],
			include: [{
				model: db.catUsuarios,
				attributes: ['nombre', 'idUsuario'],
				as: 'usuarioCreacion'
			},
			{
				model: db.catEntesFiscalizadores,
				attributes: ['nombre', 'idEnte'],
				as: 'ente'
			},
			{
				model: db.catFondos,
				attributes: ['nombre', 'idFondo'],
				as: 'fondo'
			},
			{
				model: db.catInstancias,
				attributes: ['nombre', 'idInstancia'],
				as: 'instancia'
			},
			{
				model: db.oficios,
				attributes: ['idOficio', 'numero', 'fecha', 'fechaRecepcion', 'fechaVencimiento', 'observaciones', 'pathPdfFile', 'notificaResultados', 'esUltimo', 'created_at', 'updated_at'],
				as: 'oficios'
			},
			{
				model: db.oficiosInstancia,
				attributes: ['idOficioInstancia', 'numero', 'fecha', 'fechaRecepcion', 'anexo', 'created_at', 'updated_at'],
				as: 'oficiosInstancia'
			},
			{
				model: db.observaciones,
				as: 'observaciones'
			}
			]
		})
			.then(informe => {
				var datos = {
					idInforme: informe.idInforme,
					nombre: informe.nombre,
					ejercicio: informe.ejercicio,
					delMes: informe.delMes,
					alMes: informe.alMes,
					activo: informe.activo,
					created_at: informe.created_at,
					updated_at: informe.updated_at,
					usuarioCreacion: {
						nombre: informe.usuarioCreacion.nombre,
						idUsuario: informe.usuarioCreacion.idUsuario,
					},
					ente: {
						nombre: informe.ente.nombre,
						idEnte: informe.ente.idEnte,
					},
					instancia: {
						nombre: informe.instancia.nombre,
						idInstancia: informe.instancia.idInstancia,
					}
				}
				if (informe.numero) {
					datos.numero = informe.numero
				} else {
					datos.numero = null
				}
				if (informe.numeroAuditoria) {
					datos.numeroAuditoria = informe.numeroAuditoria
				} else {
					datos.numeroAuditoria = null
				}
				if (informe.fondo) {
					datos.fondo = informe.fondo
				} else {
					datos.fondo = null
				}
				informe.oficios.forEach(arr => {
					if (arr.pathPdfFile) {
						arr.pathPdfFile = arr.pathPdfFile.split('/')[5]
					} else {
						arr.pathPdfFile = null
					}
				})
				datos.oficios = informe.oficios
				informe.oficiosInstancia.forEach(arr => {
					if (arr.anexo) {
						arr.anexo = arr.anexo.split('/')[5]
					} else {
						arr.anexo = null
					}
				})
				datos.oficiosInstancia = informe.oficiosInstancia
				datos.observaciones = []
				if (informe.observaciones.length > 0) {
					var obse = 0
					informe.observaciones.forEach(obj => {
						observaciones(obj.idObservacion)
							.then(datosObservaciones => {
								datos.observaciones.push(datosObservaciones)
								obse++
								if (obse == informe.observaciones.length) resolve(datos)
							})
							.catch(() => reject('Fallo en Buscar Observaciones'))
					})

				} else {
					resolve(datos)
				}
			})
			.catch(() => reject('Fallo en Buscar Informe'))
	})
}

const oficio = id => {
	return new Promise((resolve, reject) => {
		db.oficios.find({
			where: {
				idOficio: id
			},
			attributes: [
				'idOficio',
				'numero',
				'fecha',
				'fechaRecepcion',
				'fechaVencimiento',
				'observaciones',
				'pathPdfFile',
				'notificaResultados',
				'esUltimo',
				'created_at',
				'updated_at'
			],
			include: [{
				model: db.informes,
				attributes: ['idInforme', 'nombre'],
				as: 'informe'
			}]
		})
			.then(oficio => {
				if (oficio.pathPdfFile) oficio.pathPdfFile = oficio.pathPdfFile.split('/')[5]
				resolve(oficio)
			})
			.catch((err) => reject(err))
	})
}

const oficioInstancia = id => {
	return new Promise((resolve, reject) => {
		db.oficiosInstancia.find({
			where: {
				idOficioInstancia: id
			},
			attributes: [
				'idOficioInstancia',
				'numero',
				'fecha',
				'fechaRecepcion',
				'anexo',
				'created_at',
				'updated_at'
			],
			include: [{
				model: db.informes,
				attributes: ['idInforme', 'nombre'],
				as: 'informe'
			}]
		})
			.then(oficio => {
				if (oficio.anexo) oficio.anexo = oficio.anexo.split('/')[5]
				resolve(oficio)
			})
			.catch((err) => reject(err))
	})
}

const observaciones = id => {
	return new Promise((resolve, reject) => {
		db.observaciones.find({
			where: {
				idObservacion: id
			},
			include: [{
				model: db.observacionesLog,
				where: {
					esUltimo: 1
				},
				as: 'log',
				attributes: ['idObservacion', 'descripcion', 'monto', 'anexo', 'estatus', 'comentarios', 'esUltimo'],
				include: [{
					model: db.oficios,
					attributes: ['idOficio', 'numero'],
					as: 'oficio'
				},
				{
					model: db.catUniAdm,
					attributes: ['idUniAdm', 'nombre'],
					as: 'unidad'
				},
				{
					model: db.catUsuarios,
					attributes: ['idUsuario', 'nombre'],
					as: 'usuario'
				}
				]
			}]
		})
			.then(dato => {
				var observacion = {
					idObservacion: dato.idObservacion,
					idInforme: dato.idInforme,
					numero: dato.numero,
					oficio: dato.log[0].oficio,
					unidad: dato.log[0].unidad,
					usuario: dato.log[0].usuario,
					descripcion: dato.log[0].descripcion,
					estatus: dato.log[0].estatus,
					esUltimo: dato.log[0].esUltimo,
					created_at: dato.created_at,
					updated_at: dato.updated_at,
				}
				if (dato.log[0].anexo) {
					observacion.anexo = dato.log[0].anexo.split('/')[5]
				} else {
					observacion.anexo = null
				}
				if (dato.log[0].monto) {
					observacion.monto = dato.log[0].monto
				} else {
					observacion.monto = null
				}
				if (dato.log[0].comentarios) {
					observacion.comentarios = dato.log[0].comentarios
				} else {
					observacion.comentarios = null
				}
				db.observacionesLog.findAll({
					where: {
						idObservacion: dato.idObservacion
					},
					attributes: ['idObservacion', 'descripcion', 'monto', 'anexo', 'estatus', 'comentarios', 'esUltimo', 'created_at', 'updated_at'],
					include: [{
						model: db.oficios,
						attributes: ['idOficio', 'numero'],
						as: 'oficio'
					},
					{
						model: db.catUniAdm,
						attributes: ['idUniAdm', 'nombre'],
						as: 'unidad'
					},
					{
						model: db.catUsuarios,
						attributes: ['idUsuario', 'nombre'],
						as: 'usuario'
					}
					]
				})
					.then(logObservaciones => {
						observacion.log = logObservaciones
						observacion.log.forEach(obj => {
							if (obj.anexo) obj.anexo = obj.anexo.split('/')[5]
						})
						resolve(observacion)
					})
					.catch(() => reject('Fallo en Buscar ObservacionesLOG'))
			})
			.catch(() => reject('Fallo en Buscar Observaciones'))
	})
}

const buscar = {}

buscar.organizacion = organizacion
buscar.ente = ente
buscar.fondo = fondo
buscar.instancia = instancia
buscar.uniAdm = uniAdm
buscar.usuario = usuario
buscar.informe = informe
buscar.oficio = oficio
buscar.observaciones = observaciones
buscar.oficioInstancia = oficioInstancia

module.exports = buscar