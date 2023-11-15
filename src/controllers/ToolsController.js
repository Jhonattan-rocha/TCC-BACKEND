import { GetConnection } from "../services/TenantLoader";

class ToolsController {
    async consult(req, res) {
        try{
          const { query } = req.body;
          const tenantId = req.tenant_id; 
          const connection = GetConnection(tenantId)
          connection.query(query)
          .then((results) => {
            if (Array(results).length > 0) {
              return res.status(200).json({ result: results });
            } else {
              return res.status(200).json({ result: [] }); // Retorna um array vazio
            }
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).json({
              result: null,
              error: "Erro ao executar a query",
            });
          });
        }catch(err){
          console.log(err);
          return res.status(400).json({
            result: null,
            error: "Erro ao executar a query",
          });
        }
    }
  }
  

export default new ToolsController();
