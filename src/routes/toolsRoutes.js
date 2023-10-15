import { Router } from 'express';
import ToolsController from '../controllers/ToolsController';
import loginriquired from '../middlewares/loginriquired';
import TenantMiddleWare from '../middlewares/TenantMiddleWare';

const router = new Router();

router.post('/consult/', loginriquired, TenantMiddleWare, ToolsController.consult);

export default router;
