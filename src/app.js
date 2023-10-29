import funcionarioRouter from './routes/funcionarioRoutes';
import tokenRouter from './routes/tokenRoutes';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';


require('dotenv').config()

const whitelist = [
  'http://localhost:3000'
]

const corsops = {
  origin: function (origin, callback){
      if (whitelist.indexOf(origin) !== -1 || !origin){
        callback(null, true);
      } else{
        callback(new Error('Not allowed by CORS'));
      }
  }
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(cors(corsops));  
    this.app.use(express.urlencoded({ extended: true, limit: "50mb" }));
    this.app.use(express.json());
    this.app.use(express.static(path.resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use(funcionarioRouter);
    this.app.use(tokenRouter);
  }

}

export default new App().app;
