import { NextFunction, Request, Response } from 'express';
import Transaction from '../models/Transaction.model';
import UsersShare from '../models/UsersShare.model';


export const create = async (req: Request, res: Response) => {
    try {
      const { buyerId, sellerId, quantity, shareSymbol } = req.body;
  
      if (!buyerId || !quantity || quantity<0 || !sellerId || !shareSymbol) {
        res.status(400).send({
          status: 'error',
          message: 'Insufficient parameters!',
        });
      }

      var mSellerShare = await UsersShare.findOne({ where: { symbol:shareSymbol,"userId":sellerId  } });
      var mBuyerShare = await UsersShare.findOne({ where: { symbol:shareSymbol,"userId":buyerId  } });

      if(!mSellerShare){
            res.status(400).send({
                status: 'error',
                message: "Share not found",
            });
      }else if(mSellerShare!.quantity < quantity){
            res.status(400).send({
                status: 'error',
                message: "Insufficient quantity",
            });
      }else{

            Transaction.create({
              seller:sellerId,
              buyer:buyerId,
              shareId:shareSymbol,
              quantity,
              price:mSellerShare.price

            });
                //if buyer already has this share update quantitty otherwise create a new one
            if(mBuyerShare){
                console.log("in the not nol buyershare");
                var newBuyerQuantity = mBuyerShare.quantity + quantity;
                UsersShare.update({"quantity":(newBuyerQuantity),"updatedAt":Date()},{ where: { "symbol":mBuyerShare.symbol, "userId":mBuyerShare.userId } });
                var newSellerQuantity = mSellerShare.quantity - quantity;
                UsersShare.update({"quantity":(newSellerQuantity),"updatedAt":Date()},{ where: { "symbol":mSellerShare!.symbol, "userId":mSellerShare!.userId } });
            }else{
                let created_share = await UsersShare.create({
                symbol:mSellerShare!.symbol,
                userId:buyerId,
                quantity,
                price:mSellerShare?.price
                });
                var newSellerQuantity = mSellerShare!.quantity - quantity;
                UsersShare.update({"quantity":(newSellerQuantity),"updatedAt":Date()},{ where: { "symbol":mSellerShare!.symbol, "userId":mSellerShare!.userId } });

                res.send({
                    status: 'success',
                    data: created_share,
                    });
            }

      }

      res.send({
        status: 'success',
        data: "transaction success",
        });

    } catch (error) {
      let statusCode = 500;
      let errorMsg = 'Create failed '+error;
      if (error.name === 'SequelizeUniqueConstraintError') {
        statusCode = 400;
        errorMsg = 'Share already used';
      }
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        statusCode = 400;
        errorMsg = 'User not found';
      }

      
  
      res.status(statusCode).send({
        status: 'error',
        message: errorMsg,
      });
    }
  };
  
  