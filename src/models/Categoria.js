import Sequelize, { Model } from "sequelize";

export default class Categoria extends Model {
    static init(sequelize){
        super.init({
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
          },
          prioridade: {
            type: Sequelize.INTEGER,
            defaultValue: 5,
            validate: {
              validartamanho: function(value){
                if(value < 1 || value > 5){
                  throw new Error("Prioridade Invalida")
                }
              }
            }
          },
          nome: { 
            type: Sequelize.STRING(200),
          },
          criador: {
            type: Sequelize.STRING(200)
          },
          created_at: {
              type: Sequelize.DATE,
              allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }
        }, {sequelize, tableName: 'categorias'});

        return this;
    }

    static associate(models){
        this.belongsToMany(models.Chamado, { through: "chamados", foreignKey: "categoria", onDelete: 'cascade' });
        this.hasMany(models.SubCategoria, { foreignKey: "id_categoria", onDelete: 'cascade' });
    }
}
