import Sequelize, { Model } from "sequelize";

export default class Setores extends Model {
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
                type: Sequelize.STRING(255),
                allowNull: false,
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
            tableName: 'setores'
        })
    }

    static associate(models){
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
}
