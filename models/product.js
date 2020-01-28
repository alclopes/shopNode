
const getProductsById = db => async(id) => {
    const productsById = await db('products').select('*').where('id', function(){
        this
            .select('categories_products.product_id')
            .from('categories_products')
            .whereRaw('categories_products.product_id=products.id')
            .where('category_id', id)
    })
    return productsById
}

const getProductById = db => async(id) => {
    const productById = await db('products').select('*').where('id', id )
    return productById[0]
}

module.exports = {
 getProductsById,
 getProductById
}