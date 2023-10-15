import { Router } from 'express';
import StatusController from '../controllers/StatusController';
import loginriquired from '../middlewares/loginriquired';
import filter from '../middlewares/filter';
import TenantMiddleWare from '../middlewares/TenantMiddleWare';

const router = new Router();

router.post('/status/', loginriquired, TenantMiddleWare, StatusController.store);
router.get("/statuslist/", loginriquired, filter, TenantMiddleWare, StatusController.index);
router.get("/status/:id", loginriquired, TenantMiddleWare, StatusController.show);
router.put('/status/:id', loginriquired, TenantMiddleWare, StatusController.update);
router.delete('/status/:id', loginriquired, TenantMiddleWare, StatusController.delete);

export default router;
