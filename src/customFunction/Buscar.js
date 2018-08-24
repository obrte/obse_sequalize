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
		console.log(3)
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
				console.log(4)
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
		db.informes
			.find({
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
				}
				]
			})
			.then(informe => {
				resolve(informe)
			})
			.catch(err => reject(err))
	})
}

const oficio = id => {
	return new Promise((resolve, reject) => {
		db.informes
			.find({
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
				resolve(oficio)
			})
			.catch(err => reject(err))
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

module.exports = buscar