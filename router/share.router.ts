import { Router } from 'express';
import { create, get, getUsersAllShare, getUsersShare, update } from '../controllers/share.controller';

export default Router()
  .post('/share/create', create)
  .get('/share/get', get)
  .get('/share/get-users-share', getUsersShare)
  .get('/share/get-users-all-share', getUsersAllShare)
  .put('/share/update', update)