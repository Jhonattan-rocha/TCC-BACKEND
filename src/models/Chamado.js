import Sequelize, { Model } from "sequelize";

export default class Chamado extends Model {
    static init(sequelize){
        super.init({
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
          },
          causa: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          operador: {
            type: Sequelize.STRING(100),
            allowNull: false
          },
          descricao: {
            type: Sequelize.STRING(255),
            allowNull: false
          },
          id_status:{
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'statuses',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          dtcriação: {
            type: Sequelize.DATE,
          },
          dtinicio: {
            type: Sequelize.DATE,
          },
          dtfim: {
            type: Sequelize.DATE,
          },
          id_funcionario_criador: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'funcionarios',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          id_funcionario_resp: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'funcionarios',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          categoria: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'categorias',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          subcategoria: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'subcategorias',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          agendamento: {
            type: Sequelize.DATE,
            defaultValue: new Date()
          },
          setor: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'setores',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
            tableName: 'chamados'
        });
        return this;
    }
    
    static associate(models){
      this.belongsTo(models.Funcionario, {
        foreignKey: 'id_funcionario_criador',
        onDelete: 'cascade',
        });
        this.belongsTo(models.Funcionario, {
            foreignKey: 'id_funcionario_resp',
            onDelete: 'cascade',
        });
        this.belongsTo(models.Categoria, {
            foreignKey: 'categoria',
            onDelete: 'cascade',
        });
        this.belongsTo(models.SubCategoria, {
          foreignKey: 'subcategoria',
          onDelete: 'cascade',
        });
        this.hasMany(models.Comentario, { 
            foreignKey: 'id_chamado', 
            onDelete: 'cascade' 
        });
        this.belongsTo(models.Status, {
            foreignKey: 'id_status',
            onDelete: "cascade"
        });
        this.belongsTo(models.Setores, {
          foreignKey: 'setor',
          onDelete: "cascade"
        });
    }
};
