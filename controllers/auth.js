const user = require('../models/user')

const login = db => async(req, res) => {
    // res.send(req.body) // se o body-parser não estiver instalado o html virá em branco
    try{
        const userCur = await user.login(db)(req.body.email, req.body.passwd)
        req.session.user = userCur 
        // res.send(userCur)
        res.redirect('/')
    } catch(err){
        res.send('Controler - Error: '+ err)
    }
}

const logout = (req, res) => {
        req.session.destroy(() => {

        })
        // res.send(userCur)
        res.redirect('/')
}

module.exports = {
    login,
    logout
}