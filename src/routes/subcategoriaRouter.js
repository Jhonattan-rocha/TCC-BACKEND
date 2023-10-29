import { Router } from 'express';
import SubCategoriaController from '../controllers/SubCategoriaController';
import loginriquired from '../middlewares/loginriquired';
import getAtributes from '../middlewares/getAtributes';
import filter from '../middlewares/filter';
import TenantMiddleWare from '../middlewares/TenantMiddleWare';

const router = new Router();

router.post('/subcategoria/', loginriquired, TenantMiddleWare, SubCategoriaController.store);
router.get("/subcategorias/", loginriquired, getAtributes, filter, TenantMiddleWare, SubCategoriaController.index);
router.get("/subcategoria/:id", loginriquired, TenantMiddleWare, SubCategoriaController.show);
router.put('/subcategoria/:id', loginriquired, TenantMiddleWare, SubCategoriaController.update);
router.delete('/subcategoria/:id', loginriquired, TenantMiddleWare, SubCategoriaController.delete);

export default router;
