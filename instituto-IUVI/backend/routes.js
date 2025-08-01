import express from 'express';
import { criarProjeto, getProjetosAprovados, getProjetosPendentes, atualizarStatusProjeto, deletarProjeto } from './controllers/projetosController.js';
import autenticarAdmin from './middleware/auth.js';
import upload from './middleware/uploads.js';
import { login } from './controllers/authController.js';
import {getNoticias, criarNoticia, deletarNoticia} from './controllers/noticiasController.js'


const router = express.Router();

router.post('/projetos', upload.single('imagem'), criarProjeto);
router.get('/projetos/aprovados', getProjetosAprovados);
router.get('/admin/projetos/pendentes', autenticarAdmin, getProjetosPendentes);
router.put('/admin/projetos/:id/status', autenticarAdmin, atualizarStatusProjeto);
router.post('/admin/login', login);
router.delete('/admin/projetos/:id', autenticarAdmin, deletarProjeto); // Nova rota para deletar
router.get('/noticias', getNoticias);
router.get('/noticias', getNoticias);
router.post('/admin/noticias', autenticarAdmin, upload.single('imagem'), criarNoticia);
router.delete('/admin/noticias/:id', autenticarAdmin, deletarNoticia);



export default router;