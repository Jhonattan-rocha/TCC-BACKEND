import { Router } from 'express';
import PerfilController from '../controllers/PerfilController';
import loginriquired from '../middlewares/loginriquired';
import filter from '../middlewares/filter';
import TenantMiddleWare from '../middlewares/TenantMiddleWare';

const router = new Router();

router.post('/perfil/', loginriquired, TenantMiddleWare, PerfilController.store);
router.get("/perfis/", loginriquired, filter, TenantMiddleWare, PerfilController.index);
router.get("/perfil/:id", loginriquired, TenantMiddleWare, PerfilController.show);
router.put('/perfil/:id', loginriquired, TenantMiddleWare, PerfilController.update);
router.delete('/perfil/:id', loginriquired, TenantMiddleWare, PerfilController.delete);

export default router;
