const bcrypt = require('bcryptjs')

const generatePassHash = passwd => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(passwd, salt)
    return hash
}

const initialUsers = db => async(id) => {
    const count = await db('users').count('id as total')
    //console.log(users)
    if(count[0].total===0){
        // criar um usuário admin
        const admin = {
            name: 'Admin',
            email: 'admin@admin.com',
            passwd: generatePassHash('1234'),
            email_checked: true,
            created: new Date(),
            updated: new Date(),
            roles: 'admin,financial,customer'
        }
        await db('users').insert(admin)
        const user = {
            name: 'user',
            email: 'user@admin.com',
            passwd: generatePassHash('1234'),
            email_checked: true,
            created: new Date(),
            updated: new Date(),
            roles: 'customer'
        }
        await db('users').insert(user)
        const financ = {
            name: 'Financial',
            email: 'financ@admin.com',
            passwd: generatePassHash('1234'),
            email_checked: true,
            created: new Date(),
            updated: new Date(),
            roles: 'financial'
        }
        await db('users').insert(financ)
    }
    //return users[0]
}

const login = db => async(email, passwd) => {
    const user = await db('users').select('*').where('email', email)
    if(user.length === 0){
        throw new Error('Invalid user1.') // foi feito o tratamento no controler 
    }
    if(!bcrypt.compareSync(passwd, user[0].passwd)){
        throw new Error('Invalid user2.') 
    }
    return user[0]
}

module.exports = {
    initialUsers,
    login
}