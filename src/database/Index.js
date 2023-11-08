import Sequelize  from "sequelize";
import database from "../config/database";
import Funcionario from "../models/Funcionario";
import Empresa from "../models/Empresa";
import Filial from "../models/Filial";
import Chamado from "../models/Chamado";
import Arquivo from "../models/Arquivo";
import Perfil from "../models/Perfil";
import Categoria from "../models/Categoria";
import Setores from "../models/Setores";
import Comentario from "../models/Comentario";
import Status from "../models/Status";
import SubCategoria from '../models/SubCategoria';
import Cargo from "../models/Cargo";
import Auth from "../models/Auth";

import os from 'os';

import {InsertConnection} from '../services/TenantLoader';

export async function InitTenantAuth(schema, tenantOk=false){
    const connection = new Sequelize(database)
    const models = [Auth]

    await connection.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
    await connection.query(`USE ${schema};`);
    if(os.platform().toLowerCase().match("linux") && !tenantOk){
        await connection.query(`GRANT ALL PRIVILEGES ON ${schema}.* TO 'jhonattan'@'localhost';`);
        await connection.query(`FLUSH PRIVILEGES;`); 
    }
    models.forEach(model=>{model.init(connection)});
    if(!tenantOk){
        await connection.sync();
    }
    
    InsertConnection('auth', connection);
}


export async function InitTenant(schema, tenantOk=false){
    const models = [Perfil, Cargo, Status, Empresa, Funcionario, Setores, Filial, Categoria, SubCategoria, Chamado, Comentario, Arquivo]

    const connection = new Sequelize(database)

    await connection.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
    await connection.query(`USE ${schema};`);
    if(os.platform().toLowerCase().match("linux") && !tenantOk){
        await connection.query(`GRANT ALL PRIVILEGES ON ${schema}.* TO 'jhonattan'@'localhost';`);
        await connection.query(`FLUSH PRIVILEGES;`);
    }
    models.forEach(model=>{model.init(connection)});
    if(!tenantOk){
        await connection.sync({force: true});
        // await connection.query(`
        //     drop procedure if exists CountChamados;
//
  //          delimiter $$
//
        //     create procedure CountChamados()
        //     begin
        //         select count(ch.id_status) as qtd, ch.id_status, sts.nome, date(ch.created_at) as 'date', date(ch.updated_at) as 'ModifieDdate', dtfim
        //         from chamados as ch inner join statuses as sts on ch.id_status = sts.id group by ch.id_status, sts.nome, ch.created_at, ch.updated_at, dtfim order by ch.created_at;
        //     end$$

        //     delimiter ;
        // `);
    }
    
    models.forEach(model=>{model.associate && model.associate(connection.models)});

    InsertConnection(schema, connection);
}

export async function InitTenantModels(schema, connection){
    const models = [Perfil, Cargo, Status, Empresa, Funcionario, Setores, Filial, Categoria, SubCategoria, Chamado, Comentario, Arquivo]
    await connection.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
    await connection.query(`USE ${schema};`);
    models.forEach(model=>{model.init(connection)});
    models.forEach(model=>{model.associate && model.associate(connection.models)});
}
