const app = require('./src/App')

/*
 ! INICIAR SERVIDOR
*/
app.http.listen(app.get('port'), () => {
	console.log('server on port', 3000)
})