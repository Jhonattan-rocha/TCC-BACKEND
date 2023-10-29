import { Router } from 'express';
import CategoriaController from '../controllers/CategoriaController';
import loginriquired from '../middlewares/loginriquired';
import filter from '../middlewares/filter';
import TenantMiddleWare from '../middlewares/TenantMiddleWare';

const router = new Router();

router.post('/categoria/', loginriquired, TenantMiddleWare, CategoriaController.store);
router.get("/categorias/", loginriquired, filter, TenantMiddleWare, CategoriaController.index);
router.get("/categoria/:id", loginriquired, TenantMiddleWare, CategoriaController.show);
router.put('/categoria/:id', loginriquired, TenantMiddleWare, CategoriaController.update);
router.delete('/categoria/:id', loginriquired, TenantMiddleWare, CategoriaController.delete);

export default router;
