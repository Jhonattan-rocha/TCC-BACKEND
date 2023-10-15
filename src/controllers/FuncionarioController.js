import { InitTenant, InitTenantAuth, InitTenantModels } from "../database/Index";
import { GetConnection } from "../services/TenantLoader";
import Auth from "../models/Auth";
import Funcionario from "../models/Funcionario";
import md5 from "md5";

class FuncionarioController {
  //criar um usuario, store 
  async store(req, res) {
    try {

      await InitTenantAuth('auth', true);

      if (String(req.body.cpf).replace(/\D/g, '').length !== 11){
          return res.status(400).json({
            result: null,
            error: "cpf inválido"
          }); 
      }

      req.body.cpf = String(req.body.cpf).replace(/\D/g, '');
      req.body.telefone = String(req.body.telefone).replace(/\D/g, '');

      try{
        const find = await Auth.findOne({ where: { cpf_cnpj: req.body.cpf } });
  
        if(find) {
          return res.status(409).json({
            result: null,
            error: "CPF já cadastrado"
          });
        }
      }catch(err){
        return res.status(409).json({
          result: null,
          error: "CPF já cadastrado"
        });
      }

      const auth_user = await Auth.create({ nome: req.body.nome, cpf_cnpj: req.body.cpf, email: req.body.email, password_hash: md5(req.body.password), tenant_id: req.body.tenant_id, salt: "" });
      
      await InitTenant(req.body.tenant_id, true);

      console.log(req.body)
      const funcionario = await Funcionario.create(req.body, req.fields);
      funcionario.setDataValue("password", "Não interessa");

      await auth_user.update({id_relacional: funcionario.id});

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
      const funcionarios = await Funcionario.findAll({...rules});
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
      const funcionario = await Funcionario.findByPk(id, req.fields);
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
      const funcionario = await Funcionario.findByPk(id, req.fields);

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
      const funcionario = await Funcionario.findByPk(id, req.fields);

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

export default new FuncionarioController();

/**
 * index - lista de tudo - GET
 * store/create - cria um novo usuario - POST
 * delete - DELETE
 * show - mostra um usuario - GET
 * update - PATCH PUT
 */
