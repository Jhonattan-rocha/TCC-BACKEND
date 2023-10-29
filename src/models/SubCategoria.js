import Sequelize, { Model } from "sequelize";

export default class SubCategoria extends Model {
    static init(sequelize){
        super.init({
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
          },
          id_categoria:{
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'categorias',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
        }, {sequelize, tableName: 'subcategorias'});

        return this;
    }

    static associate(models){
        this.belongsTo(models.Categoria, { through: "categorias", foreignKey: "id_categoria", onDelete: 'cascade' });
    }
}
