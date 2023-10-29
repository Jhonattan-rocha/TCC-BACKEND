import Sequelize, { Model } from 'sequelize';

export default class Status extends Model {
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
                type: Sequelize.STRING,
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
        }, {
            sequelize,
            tableName: 'statuses'
        });
    }

    static associate(models){
        this.hasMany(models.Chamado, {foreignKey: "id_status", onDelete: 'cascade' });
    }
}