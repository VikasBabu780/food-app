import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose from "mongoose";


export const addMenu = async (req: Request, res: Response) => {
    try {
        const { name, description, price } = req.body;
        const file = req.file;
        
        if (!req.id) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }
        
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is Required"
            });
        }
        
        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        const menu = await Menu.create({
            name,
            description,
            price,
            image: imageUrl
        });

        const restaurant = await Restaurant.findOne({ user: new mongoose.Types.ObjectId(req.id) });
        
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant Not Found"
            });
        }

        // Push menu._id to restaurant's menus array
        restaurant.menus.push(menu._id as mongoose.Types.ObjectId);
        await restaurant.save();

        return res.status(201).json({
            success: true,
            message: "Menu Added Successfully",
            menu
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            success: false,
            message: "Menu Addition Failed" 
        });
    }
}


export const editMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const file = req.file;

        if (!req.id) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: "Menu Not Found"
            });
        }

        //  Verify ownership - check if this menu belongs to user's restaurant
        const restaurant = await Restaurant.findOne({ 
            user: new mongoose.Types.ObjectId(req.id),
            menus: menu._id 
        });

        if (!restaurant) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to edit this menu"
            });
        }

        if (name) menu.name = name;
        if (description) menu.description = description;
        if (price) menu.price = price;

        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            menu.image = imageUrl;
        }

        await menu.save();

        return res.status(200).json({
            success: true,
            message: "Menu Updated Successfully",
            menu,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            success: false,
            message: "Menu Update Failed" 
        });
    }
}


