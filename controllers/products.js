const product = require('../models/product')

const getProduct = db => async(req, res) => {
    const productById = await product.getProductById(db)(req.params.id)
    res.render('product-detail', { 
        product: productById 
    })
}

module.exports = {
    getProduct
}