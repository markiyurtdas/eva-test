import { NextFunction, Request, Response } from 'express';
import argon2 from 'argon2';
import passport from 'passport';
import User from '../models/User.model';
import Share from '../models/Share.model';
import UsersShare from '../models/UsersShare.model';

export const create = async (req: Request, res: Response) => {
  try {
    const { symbol, creatorId,quantity,price } = req.body;

    if (!symbol) {
      res.status(400).send({
        status: 'error',
        message: 'Field symbol required!',
      });
    }

    
    let share = await Share.create({
      symbol,
      creatorId
    });
    let user_share = await UsersShare.create({
      symbol,
      userId:creatorId,
      quantity,
      price
    });
  

    res.send({
      status: 'success',
      data: user_share,
    });
  } catch (error) {
    let statusCode = 500;
    let errorMsg = 'Create failed '+error;

    if (error.name === 'SequelizeUniqueConstraintError') {
      statusCode = 400;
      errorMsg = 'Share already used';
    }

    res.status(statusCode).send({
      status: 'error',
      message: errorMsg,
    });
  }
};


export const update = async (req: Request, res: Response) => {
  try {
    const { symbol,price } = req.body;

    if (!price) {
      res.status(400).send({
        status: 'error',
        message: 'Field price required!',
      });
    }

    var foundShare = await UsersShare.findOne({ where: { symbol:symbol } });
    var date = new Date(); // some mock date
    var currentMillis = date.getTime();
    var lastUpdatedMillis = foundShare?.updatedAt.getTime();
    var difference = currentMillis - lastUpdatedMillis;
    if(difference < (100*60*60)){
      res.status(400).send({
        status: 'error',
        message: 'You cannot update in less than 1 hour!',
      });
    }


    foundShare!.price = price;
    if(foundShare){
      UsersShare.update({"price":price,"updatedAt":Date()},{ where: { symbol:symbol } });
      res.send({
        status: 'success',
        data: foundShare,
      });
    }else{
      res.status(404).send({
        status: 'error',
        message: 'Share not found!',
      });
    }
    
    
  } catch (error) {
    let statusCode = 500;
    let errorMsg = 'Create failed '+error;

    if (error.name === 'SequelizeUniqueConstraintError') {
      statusCode = 400;
      errorMsg = 'Share already used';
    }

    res.status(statusCode).send({
      status: 'error',
      message: errorMsg,
    });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const { symbol } = req.body;

    if (!symbol) {
      res.status(400).send({
        status: 'error',
        message: 'Field symbol required!',
      });
    }

    var foundShare = await Share.findOne({ where: { symbol } });

    if(foundShare){
      res.send({
        status: 'success',
        data: foundShare,
      });
    }else{
      res.status(404).send({
        status: 'error',
        message: 'Share not found!',
      });
    }
    
    
  } catch (error) {
    let statusCode = 500;
    let errorMsg = 'failed '+error;

    res.status(statusCode).send({
      status: 'error',
      message: errorMsg,
    });
  }
};

export const getUsersShare = async (req: Request, res: Response) => {
  try {
    const { userId,symbol } = req.body;

    if (!symbol) {
      res.status(400).send({
        status: 'error',
        message: 'Field symbol required!',
      });
    }

    var foundShare = await UsersShare.findOne({ where: { "symbol":symbol,"userId":userId } });

    if(foundShare){
      res.send({
        status: 'success',
        data: foundShare,
      });
    }else{
      res.status(404).send({
        status: 'error',
        message: 'Share not found!',
      });
    }
    
    
  } catch (error) {
    let statusCode = 500;
    let errorMsg = 'failed '+error;

    res.status(statusCode).send({
      status: 'error',
      message: errorMsg,
    });
  }
};

export const getUsersAllShare = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).send({
        status: 'error',
        message: 'Field userId required!',
      });
    }

    var foundShare = await UsersShare.findAll({ where: {"userId":userId } });

    if(foundShare){
      res.send({
        status: 'success',
        data: foundShare,
      });
    }else{
      res.status(404).send({
        status: 'error',
        message: 'Share not found!',
      });
    }
    
    
  } catch (error) {
    let statusCode = 500;
    let errorMsg = 'failed '+error;

    res.status(statusCode).send({
      status: 'error',
      message: errorMsg,
    });
  }
};
