import { Router } from 'express';
import setorController from '../controllers/setorController';
import loginriquired from '../middlewares/loginriquired';
import filter from '../middlewares/filter';
import TenantMiddleWare from '../middlewares/TenantMiddleWare';

const router = new Router();

router.post('/setor/', loginriquired, TenantMiddleWare, setorController.store);
router.get("/setores/", loginriquired, filter, TenantMiddleWare, setorController.index);
router.get("/setor/:id", loginriquired, TenantMiddleWare, setorController.show);
router.put('/setor/:id', loginriquired, TenantMiddleWare, setorController.update);
router.delete('/setor/:id', loginriquired, TenantMiddleWare, setorController.delete);

export default router;
