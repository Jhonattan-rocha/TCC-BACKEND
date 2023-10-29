import { Router } from 'express';
import ComentarioController from '../controllers/ComentarioController';
import loginriquired from '../middlewares/loginriquired';
import filter from '../middlewares/filter';
import TenantMiddleWare from '../middlewares/TenantMiddleWare';

const router = new Router();

router.post('/comentario/', loginriquired, TenantMiddleWare, ComentarioController.store);
router.get("/comentarios/", loginriquired, filter, TenantMiddleWare, ComentarioController.index);
router.get("/comentario/:id", loginriquired, TenantMiddleWare, ComentarioController.show);
router.put('/comentario/:id', loginriquired, TenantMiddleWare, ComentarioController.update);
router.delete('/comentario/:id', loginriquired, TenantMiddleWare, ComentarioController.delete);

export default router;
