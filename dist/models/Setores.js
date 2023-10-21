"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Setores extends _sequelize.Model {
    static init(sequelize){
        super.init({
            id: {
                type: _sequelize2.default.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            nome: {
                type: _sequelize2.default.STRING(255),
                allowNull: false,
            },
            responsavel: {
                type: _sequelize2.default.INTEGER,
                allowNull: true,
                foreignKey: true,
                references: {model: "funcionarios", key: "id"},
            },
            created_at: {
                type: _sequelize2.default.DATE,
                allowNull: false,
            },
            updated_at: {
                type: _sequelize2.default.DATE,
                allowNull: false
            }
        }, {
            sequelize, 
            tableName: 'setores'
        })
    }

    static associate(models){
        this.belongsTo(models.Funcionario, { foreignKey: "responsavel", onDelete: 'cascade' });
        this.hasMany(models.Chamado, {
            foreignKey: 'setor',
            onDelete: "cascade"
        });
        this.hasMany(models.Funcionario, {
            foreignKey: 'setor',
            onDelete: "cascade"
        });
        // caso de ruim ao buscar chamados ou setores, aqui tá o problema
    }
} exports.default = Setores;