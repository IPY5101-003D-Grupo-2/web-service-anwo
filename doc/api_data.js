define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "/home/luis/repository/5to-semestre/web-service-anwo/doc/main.js",
    "groupTitle": "/home/luis/repository/5to-semestre/web-service-anwo/doc/main.js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/api/comprar",
    "title": "Comprar por sku",
    "name": "ComprarPorSkuyCantidad",
    "group": "Productos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>Código del producto.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cantidad",
            "description": "<p>Cantidad requerida mayor a 0.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id_cliente",
            "description": "<p>Id de su empresa.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n    mensaje: 'Venta realizada con éxito',\n    sku: 'ASD123',\n    cantidadComprada: 5,\n    stockDisponible: 995\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidRequest",
            "description": "<p>La request no tiene la forma esperada.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ClienteNoEncontrado",
            "description": "<p>La key de cliente no es válida.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProductoNoEncontrado",
            "description": "<p>El sku de producto no es válida.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InvalidRequest:",
          "content": "HTTP/1.1 404 InvalidRequest\n{\n  \"error\": \"Datos enviados no válidos\",\n}",
          "type": "json"
        },
        {
          "title": "ClienteNoEncontrado:",
          "content": "HTTP/1.1 404 ClienteNoEncontrado\n{\n  \"error\": \"No eres un cliente válido\",\n}",
          "type": "json"
        },
        {
          "title": "ProductoNoEncontrado:",
          "content": "HTTP/1.1 404 ProductoNoEncontrado\n{\n  \"error\": \"No existe el producto especificado con ese SKU\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Productos"
  },
  {
    "type": "get",
    "url": "/api/productos/all",
    "title": "Traer catálogo de productos",
    "name": "TraerTodosLosProductos",
    "group": "Productos",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"productos\": [\n    {\n        \"url\": \"https://www.anwo.cl/unidad-interior-tipo--multisplit-muro-12.000-btuh-r410a/ficha_nueva.html?p=50898&c=2804&u=5\",\n        \"nombre\": \"UNIDAD INTERIOR TIPO MULTISPLIT MURO 12.000 BTUH R410A\",\n        \"tipo\": \"Aire acondicionado\",\n        \"sku\": \"GES12-FM\",\n        \"precio\": 319,\n        \"caracteristicas\": \"\\\"Unidad Evaporadora de presentacion muro, Capacidad de Frío 12000 BTUH del Tipo INVERTER. Alimentacion Monofasica 220V/50HZ.  Incluye Kit de Cañeria de 4 mt. y control remoto Inalambrico. \\\"\",\n        \"modelo\": \"GES12-FM\",\n        \"modo_operacion\": \"FRIO / CALOR\",\n        \"alimentacion_electrica\": \"220-240/50/1\",\n        \"consumo_electrico\": 20,\n        \"capacidad_nominal\": \"11900/12500\",\n        \"caudal_aire\": \"660/540/460/330\",\n        \"nivel_ruido\": \"42/39/33/26\",\n        \"dimensiones\": \"845/209/289\",\n        \"peso_neto\": 10,\n        \"modelo_kit_cañerias\": \"GKA/GEMS/FM1\",\n        \"conexion_cañerias\": \"1/4 - 3/8\",\n        \"ficha\": \"https://www.anwo.cl/files/prd_producto/50898/Original%20Ficha%20Free%20Match%202021.pdf\",\n        \"imagen\": \"https://res.cloudinary.com/wpchile/image/fetch/h_400,f_auto,fl_progressive/https://www.anwo.cl/files//prd_producto/50898/GES07_FM.jpg\",\n        \"stock\": 100\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Productos"
  },
  {
    "type": "get",
    "url": "/api/productos/sku/:sku",
    "title": "Traer información de un producto por SKU",
    "name": "TraerUnProductoPorSku",
    "group": "Productos",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n   \"url\": \"https://www.anwo.cl/unidad-interior-tipo--multisplit-muro-12.000-btuh-r410a/ficha_nueva.html?p=50898&c=2804&u=5\",\n   \"nombre\": \"UNIDAD INTERIOR TIPO MULTISPLIT MURO 12.000 BTUH R410A\",\n   \"tipo\": \"Aire acondicionado\",\n   \"sku\": \"GES12-FM\",\n   \"precio\": 319,\n   \"caracteristicas\": \"\\\"Unidad Evaporadora de presentacion muro, Capacidad de Frío 12000 BTUH del Tipo INVERTER. Alimentacion Monofasica 220V/50HZ.  Incluye Kit de Cañeria de 4 mt. y control remoto Inalambrico. \\\"\",\n   \"modelo\": \"GES12-FM\",\n   \"modo_operacion\": \"FRIO / CALOR\",\n   \"alimentacion_electrica\": \"220-240/50/1\",\n   \"consumo_electrico\": 20,\n   \"capacidad_nominal\": \"11900/12500\",\n   \"caudal_aire\": \"660/540/460/330\",\n   \"nivel_ruido\": \"42/39/33/26\",\n   \"dimensiones\": \"845/209/289\",\n   \"peso_neto\": 10,\n   \"modelo_kit_cañerias\": \"GKA/GEMS/FM1\",\n   \"conexion_cañerias\": \"1/4 - 3/8\",\n   \"ficha\": \"https://www.anwo.cl/files/prd_producto/50898/Original%20Ficha%20Free%20Match%202021.pdf\",\n   \"imagen\": \"https://res.cloudinary.com/wpchile/image/fetch/h_400,f_auto,fl_progressive/https://www.anwo.cl/files//prd_producto/50898/GES07_FM.jpg\",\n   \"stock\": 100\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProductoNoEncontrado",
            "description": "<p>El sku no coincide con un producto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 ProductoNoEncontrado\n{\n  \"error\": \"No se ha encontrado el producto\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Productos"
  }
] });
