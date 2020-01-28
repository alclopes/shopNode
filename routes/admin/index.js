const init = db => {
    const categories = require('./categories')
    // const products = require('./products')

    const router = require('express').Router()

    // autorização por perfil
    // no caso abaixo: exige estar logado e como admin.
    /*
    router.use((req, res, next) => {
        if(req.session.user){
            if(req.session.user.roles.indexOf('admin') < 0){
                res.redirect('/')
            }else{
                next()
            }
        }else{
            res.redirect('/login')
        }
    })
    */

    // router.get('/', (req, res) => res.send('Olá da rota: admin'))
    router.get('/', (req, res) => res.render('admin/index'))
    router.use('/categorias', categories(db))
    // router.use('/produto', products(db))
    
    return router
}

module.exports = init