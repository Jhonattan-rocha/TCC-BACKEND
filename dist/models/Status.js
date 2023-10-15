"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Status extends _sequelize.Model {
    static init(sequelize){
        super.init({
            id: {
                type: _sequelize2.default.INTEGER,
                unique: true,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
              },
              nome: {
                type: _sequelize2.default.STRING,
                allowNull: false
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
            tableName: 'statuses'
        });
    }

    static associate(models){
        this.hasMany(models.Chamado, {foreignKey: "id_status", onDelete: 'cascade' });
    }
} exports.default = Status;