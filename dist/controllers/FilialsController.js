"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Filial = require('../models/Filial'); var _Filial2 = _interopRequireDefault(_Filial);

class FilialController{
    async store(req, res){
        const copy = {...req.body}

        if (String(copy.cnpj).replace(/\D/g, '').length !== 14){
            return res.status(400).json({
              result: null,  
              error: "CNPJ inválido"
            }); 
        }

        req.body.cnpj = String(req.body.cnpj).replace(/\D/g, '');
        req.body.telefone = String(req.body.telefone).replace(/\D/g, '');

        const find = await _Filial2.default.findOne({where: {cnpj: req.body.cnpj}})
        
        if(find){
          return res.status(409).json({
            result: null,
            error: "CNPJ já cadastrado"
          });
        }

        try {
            const filial = await _Filial2.default.create(req.body, req.fields)

            return res.status(200).json({result: filial})
          }catch(err){
            return res.status(400).json({
              result: null,
              error: "Erro ao cadastrar a filial"
            }); 
        };
    }

    async index(req, res){
    
        try{
            const filials = await _Filial2.default.findAll(req.fields)
            return res.status(200).json({result: filials});
        }catch(err){
            return res.status(400).json({
              result: null,
              error: "Erro ao buscar as empresas"
            })
        };
    }

    async show(req, res){
        try{
            const id = req.params.id;
            if (!id){
              return res.status(404).json({
                result: null,
                error: "Id inválido ou não existe"
              });
            };
            const filial = await _Filial2.default.findByPk(id, req.fields);
            return res.status(200).json({result: filial});
        }catch(err){
            return res.status(400).json({
              result: null,
              error: "Erro ao buscar empresa"
            })
        };
    }

    async update(req, res){
        try{
            const id = req.params.id;
            if (!id){
              return res.status(404).json({
                result: null,
                error: "ID não encontrado ou inválido"
              });
            };
            const filial = await _Filial2.default.findByPk(id, req.fields);
      
            if (!filial){
              return res.status(404).json({
                result: null,
                error: "Usuario não encontrado ou não existe"
              });
            };
      
            const result = await filial.update(req.body);
      
            return res.status(200).json({result: result});
        }catch(err){
            return res.status(400).json({
                result: null,
                error: "Erro ao buscar a filial"
            });;
        };
    }

    async delete(req, res){
        try{
            const id = req.params.id;
            if (!id){
              return res.status(404).json({
                result: null,
                error: "ID não econtrado ou inválido"
              });
            };
            const filial = await _Filial2.default.findByPk(id, req.fields);
      
            if (!filial){
              return res.status(404).json({
                result: null,
                error: "Usuario não encontrado"
              });
            };
      
            await filial.destroy();
      
            return res.status(200).json({result: filial});
        }catch(err){
          return res.status(400).json({
            result: null,
            error: "Erro ao deletar a empresa"
          })
        };
    }
}

exports. default = new FilialController();
