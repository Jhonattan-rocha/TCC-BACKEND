import Sequelize, { Model } from "sequelize";

export default class Cargo extends Model {
    static init(sequelize){
        super.init({
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
          },
          nome: {
            type: Sequelize.STRING(200),
            allowNull: false
          },
          nivel: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          criador: {
            type: Sequelize.STRING(200),
            allowNull: false
          },
          created_at: {
              type: Sequelize.DATE,
              allowNull: false,
          },
          updated_at: {
              type: Sequelize.DATE,
              allowNull: false
          }
        }, {sequelize, tableName: 'cargos'});

        return this;
    }

    static associate(models){
        this.belongsToMany(models.Funcionario, { through: "funcionarios", foreignKey: "id_cargo", onDelete: 'cascade' });
    }
}
