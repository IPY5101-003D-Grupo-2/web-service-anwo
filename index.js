const express = require('express');
const morgan = require('morgan');
const yup = require('yup');
const monk = require('monk');
require('dotenv').config();

const app = express();

const db = monk(process.env.MONGO_URI);

const productos = db.get('productos');
const clientes = db.get('clientes');
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('./doc'));

/**
 * @api {get} /api/productos/all Traer catálogo de productos
 * @apiName TraerTodosLosProductos
 * @apiGroup Productos
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *   "productos": [
 *      {
 *          "url": "https://www.anwo.cl/unidad-interior-tipo--multisplit-muro-12.000-btuh-r410a/ficha_nueva.html?p=50898&c=2804&u=5",
 *          "nombre": "UNIDAD INTERIOR TIPO MULTISPLIT MURO 12.000 BTUH R410A",
 *          "tipo": "Aire acondicionado",
 *          "sku": "GES12-FM",
 *          "precio": 319,
 *          "caracteristicas": "\"Unidad Evaporadora de presentacion muro, Capacidad de Frío 12000 BTUH del Tipo INVERTER. Alimentacion Monofasica 220V/50HZ.  Incluye Kit de Cañeria de 4 mt. y control remoto Inalambrico. \"",
 *          "modelo": "GES12-FM",
 *          "modo_operacion": "FRIO / CALOR",
 *          "alimentacion_electrica": "220-240/50/1",
 *          "consumo_electrico": 20,
 *          "capacidad_nominal": "11900/12500",
 *          "caudal_aire": "660/540/460/330",
 *          "nivel_ruido": "42/39/33/26",
 *          "dimensiones": "845/209/289",
 *          "peso_neto": 10,
 *          "modelo_kit_cañerias": "GKA/GEMS/FM1",
 *          "conexion_cañerias": "1/4 - 3/8",
 *          "ficha": "https://www.anwo.cl/files/prd_producto/50898/Original%20Ficha%20Free%20Match%202021.pdf",
 *          "imagen": "https://res.cloudinary.com/wpchile/image/fetch/h_400,f_auto,fl_progressive/https://www.anwo.cl/files//prd_producto/50898/GES07_FM.jpg",
 *          "stock": 100
 *      }
 *    ]
 *  }
 */
app.get(
    '/api/productos/all',
    async function traerTodosLosProductos(req, res, next) {
        try {
            productos.find({}, { fields: { _id: 0 } }).then((doc) => {
                return res.json({
                    productos: doc,
                });
            });
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @api {get} /api/productos/sku/:sku Traer información de un producto por SKU
 * @apiName TraerUnProductoPorSku
 * @apiGroup Productos
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  {
 *     "url": "https://www.anwo.cl/unidad-interior-tipo--multisplit-muro-12.000-btuh-r410a/ficha_nueva.html?p=50898&c=2804&u=5",
 *     "nombre": "UNIDAD INTERIOR TIPO MULTISPLIT MURO 12.000 BTUH R410A",
 *     "tipo": "Aire acondicionado",
 *     "sku": "GES12-FM",
 *     "precio": 319,
 *     "caracteristicas": "\"Unidad Evaporadora de presentacion muro, Capacidad de Frío 12000 BTUH del Tipo INVERTER. Alimentacion Monofasica 220V/50HZ.  Incluye Kit de Cañeria de 4 mt. y control remoto Inalambrico. \"",
 *     "modelo": "GES12-FM",
 *     "modo_operacion": "FRIO / CALOR",
 *     "alimentacion_electrica": "220-240/50/1",
 *     "consumo_electrico": 20,
 *     "capacidad_nominal": "11900/12500",
 *     "caudal_aire": "660/540/460/330",
 *     "nivel_ruido": "42/39/33/26",
 *     "dimensiones": "845/209/289",
 *     "peso_neto": 10,
 *     "modelo_kit_cañerias": "GKA/GEMS/FM1",
 *     "conexion_cañerias": "1/4 - 3/8",
 *     "ficha": "https://www.anwo.cl/files/prd_producto/50898/Original%20Ficha%20Free%20Match%202021.pdf",
 *     "imagen": "https://res.cloudinary.com/wpchile/image/fetch/h_400,f_auto,fl_progressive/https://www.anwo.cl/files//prd_producto/50898/GES07_FM.jpg",
 *     "stock": 100
 *  }
 *
 *
 * @apiError ProductoNoEncontrado El sku no coincide con un producto.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 ProductoNoEncontrado
 *     {
 *       "error": "No se ha encontrado el producto",
 *     }
 */
app.get('/api/productos/sku/:sku', async function buscarPorSku(req, res, next) {
    const { sku } = req.params;
    try {
        productos.findOne({ sku }).then((doc) => {
            if (doc) {
                return res.json({
                    doc,
                });
            }
            return res.status(404).json({
                error: 'No se ha encontrado el producto',
            });
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @api {post} /api/comprar Comprar por sku
 * @apiName ComprarPorSkuyCantidad
 * @apiGroup Productos
 *
 * @apiParam {String} sku               Código del producto.
 * @apiParam {Number} cantidad          Cantidad requerida mayor a 0.
 * @apiParam {String} id_cliente        Id de su empresa.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  {
 *      mensaje: 'Venta realizada con éxito',
 *      sku: 'ASD123',
 *      cantidadComprada: 5,
 *      stockDisponible: 995
 *  }
 *
 *
 * @apiError InvalidRequest La request no tiene la forma esperada.
 *
 * @apiErrorExample InvalidRequest:
 *     HTTP/1.1 404 InvalidRequest
 *     {
 *       "error": "Datos enviados no válidos",
 *     }
 *
 *
 * @apiError ClienteNoEncontrado La key de cliente no es válida.
 *
 * @apiErrorExample ClienteNoEncontrado:
 *     HTTP/1.1 404 ClienteNoEncontrado
 *     {
 *       "error": "No eres un cliente válido",
 *     }
 *
 * @apiError ProductoNoEncontrado El sku de producto no es válida.
 *
 * @apiErrorExample ProductoNoEncontrado:
 *     HTTP/1.1 404 ProductoNoEncontrado
 *     {
 *       "error": "No existe el producto especificado con ese SKU",
 *     }
 *
 *
 */
app.post('/api/comprar', async function comprarPorSku(req, res, next) {
    let schema = yup.object().shape({
        sku: yup.string().required(),
        cantidad: yup.number().required().positive().integer(),
        key_cliente: yup.string().required(),
    });

    request_valida = await schema.isValid(req.body);

    if (!request_valida) {
        return res.json({
            error: 'Datos enviados no válidos',
        });
    }

    try {
        const clienteEncontrado = await clientes.findOne({
            id: req.body.key_cliente,
        });
        if (clienteEncontrado === null) {
            response = {
                error: 'No eres un cliente válido',
            };
            return res.json(response);
        }

        const productoEncontrado = await productos.findOne({
            sku: req.body.sku,
        });
        if (productoEncontrado === null) {
            response = {
                error: 'No existe el producto especificado con ese SKU',
            };
            return res.json(response);
        }

        const nuevaCantidad = productoEncontrado.stock - req.body.cantidad;
        const productoUpdateado = await productos.findOneAndUpdate(
            { sku: req.body.sku },
            {
                $set: { stock: nuevaCantidad },
            }
        );

        return res.json({
            mensaje: 'Venta realizada con éxito',
            sku: productoUpdateado.sku,
            cantidadComprada: req.body.cantidad,
            stockDisponible: productoUpdateado.stock,
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
        error: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'woops 😢' : error.stack,
    });
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Escuchando en... http://localhost:${port}`);
});
