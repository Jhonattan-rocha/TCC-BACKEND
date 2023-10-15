import Sequelize, { Model } from "sequelize";

export default class Comentario extends Model {
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
            conteudo: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            id_chamado: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'chamados',
                  key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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
            tableName: 'comentarios'
        })
    };

    static associate(models){
        this.belongsTo(models.Funcionario, {
          foreignKey: 'id_funcionario_criador',
          onDelete: 'cascade',
        });
        this.belongsTo(models.Chamado, {
            foreignKey: 'id_chamado',
            onDelete: 'cascade',
        });
    }
}
