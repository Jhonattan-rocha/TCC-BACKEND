"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _Empresa = require('../models/Empresa'); var _Empresa2 = _interopRequireDefault(_Empresa);
var _Filial = require('../models/Filial'); var _Filial2 = _interopRequireDefault(_Filial);
var _Funcionario = require('../models/Funcionario'); var _Funcionario2 = _interopRequireDefault(_Funcionario);


exports. default = async (req, res, next) =>{
    require('dotenv').config()
    const { authorization } = req.headers;
    if (!authorization){
        return res.status(401).json({
            errors: ['Login required']
        })
    }
    const [texto, token] = authorization.split(" ")

    try{
        const dados = _jsonwebtoken2.default.verify(token, process.env.TOKENSECRET)
        const { id, email } = dados
        const filial = await _Filial2.default.findOne({
            where: {
                id,
                email,
            }
        });

        const empresa = await _Empresa2.default.findOne({
            where: {
                id,
                email,
            }
        });

        const funcionario = await _Funcionario2.default.findOne({
            where: {
                id,
                email,
            }
        });

        const promises = Promise.all([filial, empresa, funcionario])

        promises.then(response => {    
            if (!response[0] && !response[1] && !response[2]){
                return res.status(401).json({
                    errors: ['Usuário inválido']
                })
            }
            
            req.id = id
            req.email = email
            return next()
        })
        .catch(erro => {
            console.log(erro)
            return res.status(400).json({
                errors: ['Usuário inválido']
            })
        }); 

    }catch(err){
        return res.status(401).json({
            errors: ['Token expired']
        });
    }
}
