const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const catOrganizacionesRoutes = require('./routes/catalogos/Organizaciones')
const catFondosRoutes = require('./routes/catalogos/Fondos')
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
db.sequelize.sync().then(() => {
    console.log('Connected...')
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
app.use('/organizaciones', catOrganizacionesRoutes)
app.use('/fondos', catFondosRoutes)

module.exports = app