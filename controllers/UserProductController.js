import UserProduct from '../models/UserProductModel.js';
import { Op } from 'sequelize';

export const getUserProducts = async (req, res) =>{
    try {
        const response = await UserProduct.findAll();
        return res.status(200).json({status: "OK", msg: "Get User Product", data: response});
    }
    catch (error){
        return res.status(300).json({status: "Failed", msg: error.message});
    }
}


export const createUserProduct = async (req, res) =>{
    try {
        const response = await UserProduct.findAll({
            where:{
                product_id: {
                  [Op.eq]: req.body.product_id
                }}
        });
        if(response.length > 0){
            await UserProduct.update(req.body,{
                where: {
                    product_id: {
                      [Op.eq]: req.body.product_id
                    }}
            });
        }
        else{
            await UserProduct.create(req.body);
        }
        
        return res.status(201).json({status: "OK", msg: "User Product Created"});
    }
    catch (error){
        return res.status(300).json({status: "Failed", msg: error.message});
    }
}

export const updateUserProduct = async (req, res) =>{
    try {
        if(isNaN(req.body.price)){
            return res.status(300).json({status: "Failed", msg: "Price is NaN"});
        }
        await UserProduct.update(req.body,{
            where: {
                id:req.params.id
            }
        });
        return res.status(200).json({status: "OK", msg: `User Product ${req.params.id} Updated`});
    }
    catch (error){
        return res.status(300).json({status: "Failed", msg: error.message});
    }
}

export const deleteUserProduct = async (req, res) =>{
    try {
        await UserProduct.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({status: "OK", msg: `User Product ${req.params.id} Deleted`});
    }
    catch (error){
        return res.status(300).json({status: "Failed", msg: error.message});
    }
}