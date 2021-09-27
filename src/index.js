const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

let app = express();

//BD mongoose url conection
const MONGO_URI = 'mongodb://localhost/test';
mongoose.connect(MONGO_URI || process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('DB CONNECTED'));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api',require('./rutas/api'));
app.use('/api/users',require('./rutas/users'));

app.listen(3000, () => {
    console.log('iniciado');
});

// NOTA: 
// COMANDO 1 para instalar modulos: npm i
// COMANDO 2 para iniciar la aplicación: npm run dev 