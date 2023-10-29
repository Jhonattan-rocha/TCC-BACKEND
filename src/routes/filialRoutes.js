import { Router } from 'express';
import FilialController from '../controllers/FilialsController';
import loginriquired from '../middlewares/loginriquired';
import validateCPFCNPJ from '../middlewares/validateCPFCNPJ';
import getAtributes from '../middlewares/getAtributes';
import filter from '../middlewares/filter';
import TenantMiddleWare from '../middlewares/TenantMiddleWare';

const router = new Router();

router.post('/filiais/', loginriquired, validateCPFCNPJ, TenantMiddleWare, FilialController.store);
router.get("/filial/", loginriquired, getAtributes, filter, TenantMiddleWare, FilialController.index);
router.get("/filial/:id", loginriquired, getAtributes, TenantMiddleWare, FilialController.show);
router.put('/filial/:id', loginriquired, getAtributes, TenantMiddleWare, FilialController.update);
router.delete('/filial/:id', loginriquired, getAtributes, TenantMiddleWare, FilialController.delete);

export default router;