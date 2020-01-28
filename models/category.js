const slug = require('../utils/slug')
const validation = require('../utils/validation')
const Joi = require('@hapi/joi')

const createSchema = Joi.object().keys({
    // condições que serão comparadas aos campos preenchiidos no form
    category: Joi.string().min(5).max(245).required(),
    description: Joi.string().min(5).required()
})

const getCategoryById = db => async(id) => {
    const categoryById = await db('categories')
                            .select('*')
                            .where('id', id )
    // console.log(categoryById)
    return categoryById
}

const getCategories = db => async() => { 
    const categories = await db('categories')
                        .select('*')
    // console.log(categories)
    return categories
} 

const getCategoriesWithSlug = db => async() => { 
    const categories = await db('categories')
                        .select('*')
    // console.log(categories)
    const categoriesWithSlug = categories.map( category => {
        const newCategory = { ...category, slug: slug(category.category)}
        return newCategory
    })
    return categoriesWithSlug
} 

const createCategory = db => async(category) => {
    console.log('categoryModel38')
    // como não fiz tryCatch aqui o erro vai subir para o controle.
    const value = validation.validate(category, createSchema)
    await db('categories').insert(value)
    console.log('categoryModel42')
    return true
}

module.exports = {
    getCategoryById,
    getCategoriesWithSlug,
    getCategories,
    createCategory
}