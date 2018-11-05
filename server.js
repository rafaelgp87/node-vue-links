const express = require('express')
const puerto = 5000

var app = express()
app.use(express.static('public'))

app.listen(puerto, function(err){
  if(err) return console.log('Hubo un error al iniciar el servidor'), process.exit(1)
  console.log(`Servidor escuchando en el puerto ${puerto}`)
})
