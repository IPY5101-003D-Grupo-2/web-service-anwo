const express = require('express');
const morgan = require('morgan');
const yup = require('yup');
const monk = require('monk');
require('dotenv').config();

const app = express();

// const db = monk(process.env.MONGO_URI);
const db = monk(process.env.MONGO_URI);

const productos = db.get('productos');

app.use(morgan('tiny'));
app.use(express.json());

app.get('/all', async (req, res, next) => {
    try {
        productosDb = await productos.find();
        res.json({
            message: productosDb,
        });
    } catch (error) {
        next(error);
    }
});

app.get('/:sku', async function BuscarPorSku(req, res, next) {
    const { sku } = req.params;
    try {
        const productoDb = await productos.findOne({ sku });
        res.json({
            message: productoDb,
        });
    } catch (error) {
        next(error);
    }
});

app.use((error, req, res, next) => {
    if (error.status) {
        res.status(error.status);
    } else {
        res.status(500);
    }
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'woops 😢' : error.stack,
    });
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Escuchando en... http://localhost:${port}`);
});
