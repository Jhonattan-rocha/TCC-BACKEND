"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Empresa = require('../models/Empresa'); var _Empresa2 = _interopRequireDefault(_Empresa);

class EmpresaController{
    async store(req, res){
      try {

        const copy = {...req.body}

        if (String(copy.cnpj).replace(/\D/g, '').length !== 14){
            return res.status(400).json({
                result: null,
                error: "CNPJ inválido",
            }); 
        }

        req.body.cnpj = String(req.body.cnpj).replace(/\D/g, '');
        req.body.telefone = String(req.body.telefone).replace(/\D/g, '');
        
        const find = await _Empresa2.default.findOne({where: {cnpj: req.body.cnpj}})
        
        if(find){
          return res.status(409).json({
            result: null,
            error: "CNPJ já cadastrado"
          });
        }

        const empresa = await _Empresa2.default.create(req.body, req.fields)

        return res.status(200).json({result: empresa})
      }catch(err){
            console.log(err)
            return res.status(400).json({
              result: null,
              error: "Erro ao cadastrar a empresa"
            }); 
      };
    }

    async index(req, res){
        try{ 
            const empresas = await _Empresa2.default.findAll(req.fields)
            return res.status(200).json({result: empresas});
        }catch(err){
            return res.status(400).json({
              result: null,
              error: "Erro ao buscar as empresas"
            }); 
        };
    }

    async show(req, res){
        try{
            const id = req.params.id;
            if (!id){
              return res.status(404).json({
                result: null,
                error: "Erro ao buscar a empresa"
              });
            };
            const empresa = await _Empresa2.default.findByPk(id, req.fields);

            return res.status(200).json({result: empresa});
        }catch(err){
            return res.status(400).json({
              result: null,
              error: "Erro ao procurar a empresa"
            }); 
        };
    }

    async update(req, res){
        try{

            const id = req.params.id;
            if (!id){
              return res.status(200).json({
                result: null,
                error: "ID não encontrado ou inválido"
              });
            };

            // importante, se for filtrado os dados, apenas os dados filtrados podem ser atualizados
            const empresa = await _Empresa2.default.findByPk(id, req.fields);
      
            if (!empresa){
              return res.status(404).json({
                result: null,
                error: "Usuario não encontrado"
              });
            };
      
            const result = await empresa.update(req.body);
            
            return res.status(200).json({result: result});
        }catch(err){
            return res.status(400).json({
                result: null,
                error: "Erro ao buscar a empresa"
            });;
        };
    }

    async delete(req, res){
        try{
            const id = req.params.id;
            if (!id){
              return res.status(200).json({
                result: null,
                error: "ID não encontrado ou inválido"
              });
            };

            // caso o filtro de dados seja feito, apenas aqueles dados que forem filtrados serão deletados
            const empresa = await _Empresa2.default.findByPk(id, req.fields);
      
            if (!empresa){
              return res.status(200).json({
                result: null,
                error: "Usuario não encontrado"
              });
            };
      
            await empresa.destroy();
                
            return res.status(200).json({result: empresa});
          }catch(err){
            return res.status(400).json({
                result: null,
                error: "Erro ao buscar a empresa"
            });;
          };
    };
}
   

exports. default = new EmpresaController();
