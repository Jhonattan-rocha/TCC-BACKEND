import Sequelize, { Model } from 'sequelize';
import md5 from 'md5';


class Filial extends Model{
    static init(sequelize){
        super.init({
          id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
          },
          id_empresa: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'empresas',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          razao_social: {
            type: Sequelize.STRING,
          },
          nome: {
            type: Sequelize.STRING,
          },
          email: {
            type: Sequelize.STRING,
            unique: true
          },
          telefone: {
            type: Sequelize.STRING(15),
          },
          status: {
            type: Sequelize.STRING(30),
          },
          endereco: {
            type: Sequelize.STRING(200),
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
                len: [14],
                msg: "CNPJ inválido"
            }
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
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }
        }, {
            sequelize, tableName: 'filials'
        });

        this.addHook("beforeSave", filial => {
            if(filial.password){
                filial.password_hash = md5(filial.password)
            }
        });
        
        return this;
    };

    static associate(models){
      this.hasOne(models.Arquivo, { 
        foreignKey: 'id', 
        onDelete: 'CASCADE',
        as: 'Photo',
        sourceKey: 'id_foto'
      });
  }
};

// RelationShips

export default Filial;
