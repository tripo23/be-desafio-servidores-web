const ProductManager = require('./ProductManager')
const express = require('express');
const server = express();
const port = 8080;



const producto = new ProductManager('../archivo.json');

// /products?limit=1
server.get('/products', async (req, res) => {
    producto.load();
    if (req.query.limit) {
        const limit = req.query.limit;
        const shortArray = producto.products.slice(0, limit);
        res.send(shortArray);

    } else {
        res.send(producto.products);
    }
})


// /products/3
server.get('/products/:pid/', async (req, res) => {
    const selectedProduct = await producto.getProductById(req.params.pid);
    res.send(selectedProduct);
});

server.listen(port, () => {
    console.log(`Servidor BE activo en puerto ${port}.`);
});
