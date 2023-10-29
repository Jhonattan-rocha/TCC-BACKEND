import { Router } from 'express';
import EmpresaController from '../controllers/EmpresaController';
import loginriquired from '../middlewares/loginriquired';
import getAttrs from '../middlewares/getAtributes';
import validateCPFCNPJ from '../middlewares/validateCPFCNPJ';
import filter from '../middlewares/filter';
import TenantMiddleware from '../middlewares/TenantMiddleWare';

const router = new Router();

router.post('/empresa/', validateCPFCNPJ, TenantMiddleware, EmpresaController.store);
router.get("/empresas/", loginriquired, getAttrs, filter, TenantMiddleware, EmpresaController.index);
router.get("/empresa/:id", loginriquired, getAttrs, TenantMiddleware, EmpresaController.show);
router.put('/empresa/:id', loginriquired, getAttrs, TenantMiddleware, EmpresaController.update);
router.delete('/empresa/:id', loginriquired, getAttrs, TenantMiddleware, EmpresaController.delete);

export default router;