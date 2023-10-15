import Comentario from "../models/Comentario";

class ComentarioController {
  async store(req, res) {
    try{
      const comentario = await Comentario.create(req.body, req.fields)
      return res.status(200).json({result: comentario})
    }catch(err){
      console.log(err);
      return res.status(400).json({
          result: null,
          error: "Erro ao criar o comentario"
      });
    }
  };

  async index(req, res){
    try{
      const rules = {...req.fields, ...req.filter}
      console.log(rules)
      const comentario = await Comentario.findAll(rules);
      return res.status(200).json({result: comentario});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o comentario"
    });
    };
  };

  async show(req, res){
    try{
      const id = req.params.id;
      if (!id){
        return res.status(404).json({
          result: null,
          error: "Comentario não encontrado ou não existe"
      });
      };
      const comentario = await Comentario.findByPk(id, req.fields);

      return res.status(200).json({result: comentario});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o comentario"
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

      const comentario = await Comentario.findByPk(id, req.fields);

      if (!comentario){
        return res.status(404).json({
          result: null,
          error: "comentario não encontrado"
        })
      };

      const result = await comentario.update(req.body);

      return res.status(200).json({result: result});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao atualizar o comentario"
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
      const comentario = await Comentario.findByPk(id, req.fields);

      if (!comentario){
        return res.status(404).json({
          result: null,
          error: "comentario não encontrado"
        });
      };

      await comentario.destroy();

      return res.status(200).json({result: comentario});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o comentario"
      });
    };
  };
};

export default new ComentarioController();
