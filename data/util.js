const https = require('https');
const fs = require('fs');

// URL del JSON
const url = 'https://data.ny.gov/api/views/5xaw-6ayf/rows.json?accessType=DOWNLOAD';

// Función para convertir cada elemento del array data
function convertData(data) {
    return data.map(item => ({
        draw_date: item[8],
        winning_numbers: item[9],
        supplemental_numbers: item[10],
        super_ball: item[11],
        prize_amount: item[12],
        winners: item[13],
        jackpot: item[14],
        next_jackpot: item[15]
    }));
}

// Realiza la solicitud HTTPS
https.get(url, res => {
    let data = '';

    // Recibe los datos en fragmentos
    res.on('data', chunk => {
        data += chunk;
    });

    // Procesa los datos completos
    res.on('end', () => {
        const json = JSON.parse(data);
        const convertedData = convertData(json.data);

        // Guarda el resultado en un archivo JSON
        fs.writeFile('converted_data.json', JSON.stringify(convertedData, null, 2), err => {
            if (err) throw err;
            console.log('El archivo convertido se ha guardado como converted_data.json');
        });
    });
}).on('error', err => {
    console.log('Error: ' + err.message);
});
