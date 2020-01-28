const category = require('../models/category')
const product = require('../models/product')

const getCategories = db => async(req, res) => {
    // obtendo a descrição categoria da lista de produtos relacionados ao id da categoria
    const categoryById = await category.getCategoryById(db)(req.params.id)
    // obtendo os produtos relacionados ao id da categoria
    const productsById = await product.getProductsById(db)(req.params.id)
    // res.send(productsById) 

    res.render('category', { 
        category: categoryById, 
        products: productsById 
    })
}

const adminGetCategories = db => async(req, res) => {
    // pegando todas as categorias
    const categories = await category.getCategories(db)()
    res.render('admin/categories/index', { 
        categories
    })
}

const adminCreateCategory = db => async(req, res) => {
    if(req.method === 'GET'){
        console.log('categoryControl26')
        // no ejs ele tem que receber a variável para testar se ela esta vazia,
        // por isso enviamos as variáveis form e o errors mesmo que estejam vazios.
        res.render('admin/categories/create', {
            form: {},
            errors: []
        })
    }else{
        console.log('categoryControl35')
        // res.send(req.body)
        try{
            await category.createCategory(db)(req.body)
            // res.send(req.body)
            res.redirect('/admin/categorias')
        }catch(err){
            res.send(err)
            /*
            res.render('admin/categories/create', {
                form: req.body,
                errors: err.errors.fields
            })
            */
        }
    }
}

module.exports = {
    getCategories,
    adminGetCategories,
    adminCreateCategory
}