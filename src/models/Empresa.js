import Sequelize, { Model } from "sequelize";
import md5 from "md5";

class Empresa extends Model{
    static init(sequelize){
        super.init({
          id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
          },
          razao_social: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              len: [1, 50]
            }
          }, 
          nome: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              len: [1, 50]
            }
          },
          email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: {
              msg: "Email já existe"
            }
          },
          telefone: {
            type: Sequelize.STRING(15),
            allowNull: false,
          },
          status: {
            type: Sequelize.STRING(30),
            allowNull: false
          },
          endereco: {
            type: Sequelize.STRING(200),
            allowNull: false,
          },
          password: {
            type: Sequelize.VIRTUAL
          },
          password_hash:{
            type: Sequelize.STRING(50),
            validate: {
                len: [10, 50],
                msg: "A senha deve ter no minimo 10 caracteres até 50 caracteres"
            }
          },
          cnpj: {
            type: Sequelize.STRING(14),
            allowNull: false,
            unique: true,
            validate: {
                cnpjValidator: function(value){
                    if (String(value).replace(/\D/g, '').length !== 14){
                        throw new Error("CNPJ inválido")
                    }
                }
            },
          },
          endereco: {
            type: Sequelize.STRING(255),
            allowNull: true
          },
          bairro: {
            type: Sequelize.STRING(255),
            allowNull: true
          },
          numero: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
          cep:{
            type: Sequelize.STRING(20),
            allowNull: true,
              validate: {
                cpfValidator: function(value){
                    if (String(value).length > 0 && String(value).replace(/\D/g, '').length !== 8){
                        throw new Error("cep inválido")
                    }
                }
            }
          },
          id_foto: {
            type: Sequelize.INTEGER,
            allowNull: true,
            // references: {
            //   model: 'arquivos',
            //   key: 'id',
            // },
            // onDelete: 'CASCADE',
            // onUpdate: 'CASCADE',
          },
          tenantOk: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false 
          }
        }, {sequelize, tableName: 'empresas'});

        this.addHook("beforeSave", empresa => {
            if (empresa.password){
                empresa.password_hash = md5(empresa.password)
            }
        });

        return this;
    };
    
    static associate(models){
        this.hasMany(models.Filial, { foreignKey: 'id_empresa', onDelete: 'cascade' });
        this.hasOne(models.Arquivo, { 
          foreignKey: 'id', 
          onDelete: 'CASCADE',
          as: 'Photo',
          sourceKey: 'id_foto'
        });
    }
};

// RelationShips

export default Empresa;
