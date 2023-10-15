import { Router } from 'express';
import CargoController from '../controllers/CargoController';
import loginriquired from '../middlewares/loginriquired';
import getAtributes from '../middlewares/getAtributes';
import filter from '../middlewares/filter';
import TenantMiddleWare from '../middlewares/TenantMiddleWare';

const router = new Router();

router.post('/cargo/', loginriquired, TenantMiddleWare, CargoController.store);
router.get("/cargos/", loginriquired, getAtributes, filter, TenantMiddleWare, CargoController.index);
router.get("/cargo/:id", loginriquired, getAtributes, TenantMiddleWare, CargoController.show);
router.put('/cargo/:id', loginriquired, TenantMiddleWare, CargoController.update);
router.delete('/cargo/:id', loginriquired, TenantMiddleWare, CargoController.delete);

export default router;
