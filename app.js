const init = db => {

    const express = require('express')
    const app = express()

    const category = require('./models/category')
    const routes = require('./routes')

    const bodyParser = require('body-parser')
    const session = require('express-session')

    app.use(bodyParser.json({ extended: true }))
    app.use(bodyParser.urlencoded())

    app.use(session({
        secret:'mysecret',
        name:'sessionId'
    }))

    app.set('view engine', 'ejs')
    app.use(express.static('public'))

    // middleware
    app.use(async(req, res, next) => {
        const {user} = req.session // construction assign 
        const categories = await category.getCategoriesWithSlug(db)()
        res.locals = {
            user,
            categories,
            date: new Date()
        }
        next()
    })

    app.use(routes(db))
    return app
}

module.exports = init
