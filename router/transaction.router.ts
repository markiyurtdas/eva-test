import { Router } from 'express';
import { create } from '../controllers/transaction.controller';
export default Router()
  .post('/transaction/create', create)