"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Arquivo = require('../models/Arquivo'); var _Arquivo2 = _interopRequireDefault(_Arquivo);
var _Funcionario = require('../models/Funcionario'); var _Funcionario2 = _interopRequireDefault(_Funcionario);

class FuncionarioController {
  //criar um usuario, store 
  async store(req, res) {
    try {
      if (String(req.body.cpf).replace(/\D/g, '').length !== 11){
          return res.status(400).json({
            result: null,
            error: "cpf inválido"
          }); 
      }

      req.body.cpf = String(req.body.cpf).replace(/\D/g, '');
      req.body.telefone = String(req.body.telefone).replace(/\D/g, '');

      const find = await _Funcionario2.default.findOne({where: {cpf: req.body.cpf}})
        
      if(find){
        return res.status(409).json({
          result: null,
          error: "cpf já cadastrado"
        });
      }
      
      const funcionario = await _Funcionario2.default.create(req.body, req.fields);
      funcionario.setDataValue("password", "Não interessa");
      return res.status(200).json({result: funcionario});
    }catch(err){
      console.log(err)
      return res.status(400).json({
            result: null,
            error: "Erro ao cadastrar funcionario"
      });
    };
  };

  async index(req, res){
    try{
      const rules = {...req.fields, ...req.filter}
      const funcionarios = await _Funcionario2.default.findAll({...rules});
      return res.status(200).json({result: funcionarios});
    }catch(err){
      console.log(err)
      return res.status(400).json({
            result: null,
            error: "Erro ao buscar os funcionarios"
      });
    };
  };

  async show(req, res){
    try{
      const id = req.params.id;
      if (!id){
        return res.status(404).json({
          result: null,
          error: "ID inválido ou não encontrado"
        });
      };
      const funcionario = await _Funcionario2.default.findByPk(id, req.fields);
      return res.status(200).json({result: funcionario});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o funcionario"
      });
    };
  };

  async update(req, res){
    try{
      const id = req.params.id;
      if (!id){
        return res.status(200).json({
          result: null,
          error: "ID não encontrado ou inválido"
        });
      };
      const funcionario = await _Funcionario2.default.findByPk(id, req.fields);

      if (!funcionario){
        return res.status(404).json({
          result: null,
          error: "Usuario não encontrado"
        });
      };
      const result = await funcionario.update({...req.body});

      return res.status(200).json({result: result});
    }catch(err){
      console.log(err) 
      return res.status(400).json({
            result: null,
            error: "Erro ao buscar o funcionario"
      });
    };
  };

  async delete(req, res){
    try{
      const id = req.params.id;

      if (!id){
        return res.status(404).json({
          result: null,
          error: "ID não encontrado ou inválido"
        });
      };
      const funcionario = await _Funcionario2.default.findByPk(id, req.fields);

      if (!funcionario){
        return res.status(404).json({
          result: null,
          error: "Usuario não encontrado"
        });
      };

      await funcionario.destroy();

      return res.status(200).json({result: funcionario});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o funcionario"
      });
    };
  };
}; 

exports. default = new FuncionarioController();

/**
 * index - lista de tudo - GET
 * store/create - cria um novo usuario - POST
 * delete - DELETE
 * show - mostra um usuario - GET
 * update - PATCH PUT
 */
