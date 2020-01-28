
const db = require('knex')({
    client: 'mysql2',
    connection: {
        host:'127.0.0.1',
        user: 'root',
        password: 'mnhy67ujm',
        database: 'devshop'
    }
})

db.on('query', query => {
    console.log('SQL: ', query.sql)
})

const app = require('./app')(db)

const port = process.env.PORT || 3000

const user = require('./models/user')
user.initialUsers(db)()

app.listen(port, err => {
    if(err){
        console.log('Não foi possível iniciar o servidor')
    }else{
        console.log('Servidor disponível')
    }
})


