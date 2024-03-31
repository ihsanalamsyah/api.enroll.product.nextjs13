
import Image from '../models/ImageModel.js';
import fs from 'fs';
import { Op } from 'sequelize';

export const uploadImage = async (req, res) =>{
    try{
        const response = await Image.findOne({
            where: {
                product_id: req.body.productId
            }
        });
       
        if(!req.file){
            return res.status(300).json({ status: "Failed", msg: 'Tidak ada file yang diunggah' });
        }
        
        const data = fs.readFileSync(req.file.path);
       
        const blobData = Buffer.from(data, 'binary');
        const imageFile = req.file;
        let image;
        if(response != null){
            image = await Image.update({
                image_blob: blobData,
                product_id: req.body.productId,
                content_type : imageFile.mimetype
            },{
                where: {
                    product_id: {
                      [Op.eq]: req.body.productId
                    }}
            });          
        }
        else{
            image = await Image.create({
                image_blob: blobData,
                product_id: req.body.productId,
                content_type : imageFile.mimetype
            });
        }
            
        fs.unlinkSync(req.file.path);
        //return res.send(image.image_blob);
        return res.status(200).json({ status: "OK", msg: 'Success upload image', data: blobData  });

    }
    catch (error){
        return res.status(300).json({status: "Failed", msg: error.message});
    }
}

export const getImage = async (req, res) =>{
    try{
        const response = await Image.findOne({
            where: {
                product_id: req.body.productId
            }
        });
        
        if(!response){
            return res.status(300).json({ status: "Failed", msg: 'Product id salah atau gambar tidak ada' });
        }

        
        return res.status(200).json({ status: "OK", msg: 'Success load image', data: response.image_blob  });
        //return res.status(200).send(response.image_blob);
    }
    catch (error){
        return res.status(300).json({status: "Failed", msg: error.message});
    }
}