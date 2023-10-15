"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _database = require('../database');

class ToolsController {
    async consult(req, res) {
        const { query } = req.body;
        _database.connection.query(query)
        .then((results) => {
          if (results !== []) {
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
    }
  }
  

exports. default = new ToolsController();
