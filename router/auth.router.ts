import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller';

export default Router()
  .post('/auth/register', register)
  .post('/auth/login', login)
  .post('/auth/logout', logout);
