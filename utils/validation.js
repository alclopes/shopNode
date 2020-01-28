const Joi = require('@hapi/joi')

const extractErrors1 = error => {
    return error.details.reduce((prev, curr) => {
        if(prev[curr.path[0]]){
            prev[curr.path[0]].push(curr.type)
        }else{
            prev[curr.path[0]] = [curr.type]
        }
        return prev
    }, {})
}

const extractErrors = error => {
    const errors = error.details.reduce((prev, curr) => {
        if(prev[curr.path[0]]){
            prev[curr.path[0]].push(curr.type)
        }else{
            prev[curr.path[0]] = [curr.type]
        }
        return prev
    }, {})
    return {
        errors,
        fields: Object.keys(errors)
    }
}

const ValidationError = (message, errors) => ({
    message, 
    errors
})

const validate = (obj, schema) => {
    console.log('validation36')
    // // abortEarly: false (valida todo o form e depois envia os erros)
    // // stripUnknow: true (não valida ou aponta como erro a existencia de campos que não existem no schema)
    const { error, value } = Joi.validate(obj, schema , { abortEarly: false, stripUnknown: true })
    console.log('validation40')
    if(error){
        // console.log('ErroValidate:', error.details)
        // console.log('ErroValidate:', extractErrors(error))
        // return error
        // return extractErrors(error)
        // throw new Error({message: 'validation', errors:extractErrors(error)})
        throw ValidationError('validation', extractErrors(error))
    }else{
        return value
    }
    return value
}

module.exports = {
    validate
}