const _ = require("lodash");



// Importar el paquete de terceros que acabamos de instalar. Fijaos que como se encuentra en la carpeta node_modules NO hace falta especificar ninguna ruta (al igual que pasa con los built-in modules)
const express = require('express');
const logger = require('morgan');

// Es generarme un objeto para gestionar el enrutamiento y otros aspectos de la aplicación
const app = express();

// Añadimos el middleware de morgan para loguear todas las peticiones que haga un cliente
app.use(logger('dev'));

// nos gustaría que también gestionaras los datos de tipo JSON (entre ellos los POST que nos lleguen)
app.use(express.urlencoded({ extended: true }));  // Middleware para parsear datos de formularios


const getAllWinningNumbers = (raffle) => {
    return `${raffle.winning_numbers} ${raffle.supplemental_numbers} ${raffle.super_ball}`
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/api/check-date', (req, res) => {
    // 1. Cargar el JSON
    const lottery = require('./data/lottery.json');

    // 2. Obtener la fecha a comprobar de la query string
    const { date } = req.query;
    console.log("🚀 ~ file: app.js:28 ~ app.get ~ date:", date)

    // 3. Buscar en el array lottery 
    const item = lottery.find(n => n.draw_date.includes(date));

    if (item) {

        // 4. Responder al cliente con un JSON con el formato adecuado
        res.send({
            message: "Draw found",
            winningNumbers: getAllWinningNumbers(item)
        });
    } else {
        return res.status(404).send({
            message: `No draw found on ${date}`,
        })
    }
});

app.get('/api/get-computed-results', (req, res) => {
    // 1. Cargar el JSON
    const lottery = require('./data/lottery.json');

    // 2. Obtener la fecha a comprobar de la query string
    const { date, playedNumbers } = req.query;

    // 3. Buscar en el array lottery 
    const item = lottery.find(n => n.draw_date.includes(date));

    if (item) {

        // 3.5 Dame la intersección de los dos arrays
        const matchedNumbers = _.intersection(playedNumbers.split(' '), getAllWinningNumbers(item).split(' '))

        // 3.6 ¿Qué premio le corresponde?
        const prizes = require('./data/prizes.json');


        // 4. Responder al cliente con un JSON con el formato adecuado
        res.send({
            message: "Draw found",
            matchedNumbers: matchedNumbers.length,
            prize: prizes[matchedNumbers.length].prize
        });
    } else {
        return res.status(404).send({
            message: `No draw found on ${date}`,
        })
    }
});

// Levantar el servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000.");
});

