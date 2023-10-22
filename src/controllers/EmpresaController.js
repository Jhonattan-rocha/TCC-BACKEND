import { InitTenant, InitTenantAuth, InitTenantModels } from "../database/Index";
import Auth from "../models/Auth";
import Empresa from "../models/Empresa";
import md5 from "md5";
import { GetConnection, generateRandomString } from "../services/TenantLoader";

class EmpresaController{
    async store(req, res) {
      try {
        await InitTenantAuth('auth', true);
    
        const copy = { ...req.body };
    
        if (String(copy.cnpj).replace(/\D/g, '').length !== 14) {
          return res.status(400).json({
            result: null,
            error: "CNPJ inválido",
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
    
        const tenantid = generateRandomString(20);
        const auth_user = await Auth.create({ nome: req.body.nome, cpf_cnpj: req.body.cnpj, email: req.body.email, password_hash: md5(req.body.password), tenant_id: tenantid, salt: "" });
    
        await InitTenant(tenantid, false);
    
        const empresa = await Empresa.create(req.body, req.fields);

        await auth_user.update({id_relacional: empresa.id, id_foto: empresa.id_foto ?? 0});
        empresa.setDataValue('password', 'Não interessa');
        return res.status(200).json({ result: empresa });

      } catch (err) {
        console.error(err);
        return res.status(400).json({
          result: null,
          error: "Erro ao cadastrar a empresa"
        });
      }
    }
    async index(req, res){
        try{ 
            const empresas = await Empresa.findAll(req.fields)
            return res.status(200).json({result: empresas});
        }catch(err){
          console.log(err)
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
            const empresa = await Empresa.findByPk(id, req.fields);

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

            const empresa = await Empresa.findByPk(id, req.fields);
            const auth = await Auth.findOne({where: {cpf_cnpj: empresa.cnpj}});
            
            if (!empresa){
              return res.status(404).json({
                result: null,
                error: "Usuario não encontrado"
              });
            };
      
            const result = await empresa.update(req.body);
            await auth.update({email: result.email, cpf_cnpj: result.cnpj, id_foto: result.id_foto ?? 0});

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
            const empresa = await Empresa.findByPk(id, req.fields);
            const auth = await Auth.findOne({where: {cpf_cnpj: empresa.cnpj}});

            if (!empresa){
              return res.status(200).json({
                result: null,
                error: "Usuario não encontrado"
              });
            };
      
            await empresa.destroy();
            await auth.destroy();
                
            return res.status(200).json({result: empresa});
          }catch(err){
            return res.status(400).json({
                result: null,
                error: "Erro ao buscar a empresa"
            });;
          };
    };
}
   

export default new EmpresaController();
