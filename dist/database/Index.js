"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Funcionario = require('../models/Funcionario'); var _Funcionario2 = _interopRequireDefault(_Funcionario);
var _Auth = require('../models/Auth'); var _Auth2 = _interopRequireDefault(_Auth);

var _TenantLoader = require('../services/TenantLoader');

 async function InitTenantAuth(schema, tenantOk=false){
    const connection = new (0, _sequelize2.default)(_database2.default)
    const models = [_Auth2.default]

    await connection.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`)
    await connection.query(`USE ${schema};`)
    models.forEach(model=>{model.init(connection)});
    if(!tenantOk){
        await connection.sync();
    }
    
    _TenantLoader.InsertConnection.call(void 0, 'auth', connection);
} exports.InitTenantAuth = InitTenantAuth;


 async function InitTenant(schema, tenantOk=false){
    const models = [_Funcionario2.default]

    const connection = new (0, _sequelize2.default)(_database2.default)

    await connection.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
    await connection.query(`USE ${schema};`);
    models.forEach(model=>{model.init(connection)});
    if(!tenantOk){
        await connection.sync({force: true});
        await connection.query(`
            drop procedure if exists CountChamados;

            delimiter $$

            create procedure CountChamados()
            begin
                select count(ch.id_status) as qtd, ch.id_status, sts.nome, date(ch.created_at) as 'date', date(ch.updated_at) as 'ModifieDdate', dtfim
                from chamados as ch inner join statuses as sts on ch.id_status = sts.id group by ch.id_status, sts.nome, ch.created_at, ch.updated_at, dtfim order by ch.created_at;
            end$$

            delimiter ;
        `);
    }
    
    models.forEach(model=>{model.associate && model.associate(connection.models)});

    _TenantLoader.InsertConnection.call(void 0, schema, connection);
} exports.InitTenant = InitTenant;

 async function InitTenantModels(schema, connection){
    const models = [_Funcionario2.default]
    await connection.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
    await connection.query(`USE ${schema};`);
    models.forEach(model=>{model.init(connection)});
    models.forEach(model=>{model.associate && model.associate(connection.models)});
} exports.InitTenantModels = InitTenantModels;
