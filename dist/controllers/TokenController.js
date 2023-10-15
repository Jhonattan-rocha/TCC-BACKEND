"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Empresa = require('../models/Empresa'); var _Empresa2 = _interopRequireDefault(_Empresa);
var _Filial = require('../models/Filial'); var _Filial2 = _interopRequireDefault(_Filial);
var _Funcionario = require('../models/Funcionario'); var _Funcionario2 = _interopRequireDefault(_Funcionario);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

require('dotenv').config()

class TokenController {
  async store(req, res, next) {
    const { email='', password='', type="" } = req.body;
    const md5 = require('md5')

    if (!email || !password){   
        return res.status(400).json({
            result: null,
            error: "Email ou senha vazios"
        });
    }

    if(!type){
        return res.status(400).json({
            result: null,
            error: "Tipo de usuário inválido"
        });
    }

    if(type !== "e" && type !== "fu" && type !== "fa"){
        return res.status(400).json({
            result: null,
            error: "Tipo de usuário inválido"
        });
    }

    const empresa = _Empresa2.default.findOne({where: {
        email: email
    }});

    const filial = _Filial2.default.findOne({where: {
        email: email
    }});

    const funcionario = _Funcionario2.default.findOne({where: {
        email: email
    }});


    const users = await Promise.all([empresa, filial, funcionario])
    for(let user of users){
        if(user){
            if(user.getDataValue("password_hash") === String(md5(password))){
                const { id } = user;
                const ex = "7d"
                const token = _jsonwebtoken2.default.sign({id, email}, process.env.TOKENSECRET, {
                    expiresIn: ex,
                });
                console.log(user)
                return res.json({token: token, user: { nome: user.nome, type: type, id: user.id, email: user.email, id_empresa: user.id_empresa}});
            }  
        }
    }

    return res.status(404).json({
        result: null,
        error: "Usuário não encontrado, senha inválida"
    });
    // Bearer
  };

  async verifyToken(req, res){
    try{
        const verify = _jsonwebtoken2.default.verify(req.body.token, process.env.TOKENSECRET);
        if(verify){
            return res.status(200).json({
                result: "Token valido"
            });
        };
    }catch(err){
        console.log(err)
        return res.status(400).json({
            result: null,
            error: "Token inválido"
        });
    }
  }
};

exports. default = new TokenController();
