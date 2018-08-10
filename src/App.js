const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./routes/index')
const http = require('http').Server(app)
app.http = http
const PORT = process.env.PORT || 3000

/*
 ! CONECCION A LA DB
*/
const db = require('./config/db')
//prueba de conección
db.sequelize
	.authenticate()
	.then(() => {
		console.log('Connection successfully.')
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err)
	})

db.sequelize.sync({
	logging: false
}).then(() => {
	db.catUsuarios.findOrCreate({
		where: {
			tipo: 'superadmin'
		},
		defaults: {
			nombre: 'SUPER ADMINISTRADOR INICIAL',
			email: 'super@admin.com',
			//pwd = 123
			password: '$2b$10$tr4bhD1uPvwKO57ssSSzBe9BWoFlNrdec5t66DuZNsWgbdOMOGRLq'
		}
	})
		.then((existe, creado) => {
			if (creado) {
				console.log('SUPERADMIN inicial Creado')
			} else {
				console.log('SUPERADMIN ya existe')
			}

		})
	console.log('Sync successfully...')
})

/*
 ! OPCIONES DE APP
*/
app.set('port', PORT)


/*
 ! MIDDLEWARES
*/
var corsOptions = {
	origin: 'http://localhost:8080',
	optionsSuccessStatus: 200,
	credentials: true
}
app.use(cors(corsOptions))
app.use(bodyParser.json())


/*
 ! RUTAS
*/
router(app, db)

module.exports = app