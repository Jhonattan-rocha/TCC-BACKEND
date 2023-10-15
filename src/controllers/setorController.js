import Setor from "../models/Setores";

class SetorController {
  async store(req, res) {
    try{

      const setor = await Setor.create(req.body, req.fields)
      return res.status(200).json({result: setor})
    }catch(err){
      console.log(err)
      return res.status(400).json({
          result: null,
          error: "Erro ao criar o Setor"
      });
    }
  };

  async index(req, res){
    try{
      const rules = {...req.fields, ...req.filter}
      const setor = await Setor.findAll(rules);
      return res.status(200).json({result: setor});
    }catch(err){
      console.log(err)
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar os setores cadastrados"
      });
    };
  };

  async show(req, res){
    try{
      const id = req.params.id;
      if (!id){
        return res.status(404).json({
          result: null,
          error: "ID não encontrado ou inválido"
        });
      };
      const setor = await Setor.findByPk(id, req.fields);

      return res.status(200).json({result: setor});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar os setores cadastrados"
      });
    };
  };

  async update(req, res){
    try{

      const id = req.params.id;
      
      if (!id){
        return res.status(404).json({
          result: null,
          error: "ID não encontrado ou inválido"
        })
      };

      const setor = await Setor.findByPk(id, req.fields);

      if (!setor){
        return res.status(404).json({
          result: null,
          error: "Setor não encontrado"
        })
      };

      const result = await setor.update(req.body);

      return res.status(200).json({result: result});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar os setores cadastrados"
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
      const setor = await Setor.findByPk(id, req.fields);

      if (!setor){
        return res.status(200).json({
          result: null,
          error: "Setor não encontrado"
        });
      };

      await setor.destroy();

      return res.status(200).json({result: setor});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o setor"
      });
    };
  };
};

export default new SetorController();
