import { Router } from 'express';
import ChamadoController from '../controllers/ChamadoController';
import loginriquired from '../middlewares/loginriquired';
import getAtributes from '../middlewares/getAtributes';
import filter from '../middlewares/filter';
import TenantMiddleWare from '../middlewares/TenantMiddleWare';

const router = new Router();

router.post('/chamado/', loginriquired, TenantMiddleWare, ChamadoController.store);
router.get("/chamados/", loginriquired, getAtributes, filter, TenantMiddleWare, ChamadoController.index);
router.get("/chamado/:id", loginriquired, getAtributes, TenantMiddleWare, ChamadoController.show);
router.put('/chamado/:id', loginriquired, getAtributes, TenantMiddleWare, ChamadoController.update);
router.delete('/chamado/:id', loginriquired, getAtributes, TenantMiddleWare, ChamadoController.delete);

export default router;
