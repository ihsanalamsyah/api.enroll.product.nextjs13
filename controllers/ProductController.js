import Product from '../models/ProductModel.js';
import User from '../models/UserModel.js';
import UserProduct from '../models/UserProductModel.js';
import { Op } from 'sequelize';

export const getUserGetProducts = async (req, res) =>{
    try {
        let response;
        const response2 = await User.findOne({
            where: {
                name: req.body.name
            }
        });
       
        if (response2.role == "User"){
            response = await UserProduct.findAll({
                where:{
                    [Op.or]:[
                        {'$UserProduct.enroll_date$': null},
                        {'$User.name$': req.body.name}
                    ]                  
                },
                include: [{
                    model: User,
                    required: true,
                    right: false
                },{
                    model: Product,
                    required: false,
                    right: true
                }],
                order:[
                    ['enroll_date', 'DESC']
                ]
            });
        }
        else{
            response = await UserProduct.findAll({             
                include: [{
                    model: User,
                    required: true,
                    right: false
                },{
                    model: Product,
                    required: false,
                    right: true
                }]
            });
        }
       
        return res.status(200).json({status: "OK", msg: "Get Product", user_products: response, user: response2});
    }
    catch (error){
        return res.status(300).json({status: "Failed", msg: error.message});
    }
}

export const getProducts = async (req, res) =>{
    try {
        const response = await Product.findAll();
        return res.status(200).json({status: "OK", msg: "Get Product", data: response});
    }
    catch (error){
        return res.status(300).json({status: "Failed", msg: error.message});
    }
}

export const getProductById = async (req, res) =>{
    try {
        const response = await Product.findOne({
            where: {
                id: req.body.id
            }
        });
        return res.status(200).json({status: "OK", msg: "Get Product", data: response});
    }
    catch (error){
        return res.status(300).json({status: "Failed", msg: error.message});
    }
}

export const createProduct = async (req, res) =>{
    try {
        if(isNaN(req.body.price)){
            return res.status(300).json({status: "Failed", msg: "Price is NaN"});
        }
        await Product.create(req.body);
        return res.status(201).json({status: "OK", msg: "Product Created"});
    }
    catch (error){
        return res.status(300).json({status: "Failed", msg: error.message});
    }
}

export const updateProduct = async (req, res) =>{
    try {
        if(isNaN(req.body.price)){
            return res.status(300).json({status: "Failed", msg: "Price is NaN"});
        }
        await Product.update(req.body,{
            where: {
                id:req.params.id
            }
        });
        return res.status(200).json({status: "OK", msg: `Product ${req.params.id} Updated`});
    }
    catch (error){
        return res.status(300).json({status: "Failed", msg: error.message});
    }
}

export const deleteProduct = async (req, res) =>{
    try {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({status: "OK", msg: `Product ${req.params.id} Deleted`});
    }
    catch (error){
        return res.status(300).json({status: "Failed", msg: error.message});
    }
}