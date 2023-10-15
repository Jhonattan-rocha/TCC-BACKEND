"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);
var _appConfig = require('./config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _https = require('https'); var _https2 = _interopRequireDefault(_https);

const privateKey = _fs2.default.readFileSync('C:\\Users\\Jhinattan Rocha\\Documents\\Trabalho\\chave-privada.pem', 'utf8');
const certificate = _fs2.default.readFileSync('C:\\Users\\Jhinattan Rocha\\Documents\\Trabalho\\certificado.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const server = _https2.default.createServer(credentials, _app2.default);

server.listen(_appConfig2.default.PORT, _appConfig2.default.IP,()=>{
    // para funcionar no emulador android, precisa ser essa url http://10.0.2.2:3000/
    console.log(`rodando na url https://${_appConfig2.default.IP}:${_appConfig2.default.PORT}/`)
})
