import { InitTenant, InitTenantAuth, InitTenantModels } from "../database/Index";
import Auth from "../models/Auth";
import Filial from "../models/Filial";
import { GetConnection } from "../services/TenantLoader";

class FilialController{
    async store(req, res){
        await InitTenantAuth('auth', true);

        const copy = {...req.body}

        if (String(copy.cnpj).replace(/\D/g, '').length !== 14){
            return res.status(400).json({
              result: null,  
              error: "CNPJ inválido"
            }); 
        }

        req.body.cnpj = String(req.body.cnpj).replace(/\D/g, '');
        req.body.telefone = String(req.body.telefone).replace(/\D/g, '');

        try{
          const find = await Auth.findOne({ where: { cpf_cnpj: req.body.cnpj } });
    
          if(find) {
            return res.status(409).json({
              result: null,
              error: "CNPJ já cadastrado"
            });
          }
        }catch(err){
          return res.status(409).json({
            result: null,
            error: "CNPJ já cadastrado"
          });
        }

        try {
            const auth_user = await Auth.create({ nome: req.body.nome, cpf_cnpj: req.body.cnpj, email: req.body.email, password_hash: md5(req.body.password), tenant_id: req.body.tenant_id, salt: "" });

            await InitTenant(req.body.tenant_id, true)

            const filial = await Filial.create(req.body, req.fields)

            await auth_user.update({id_relacional: filial.id});
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
            const filials = await Filial.findAll(req.fields)
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
            const filial = await Filial.findByPk(id, req.fields);
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
            const filial = await Filial.findByPk(id, req.fields);
      
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
            const filial = await Filial.findByPk(id, req.fields);
      
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

export default new FilialController();
