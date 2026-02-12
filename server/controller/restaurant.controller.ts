import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Order } from "../models/order.model";
import mongoose from "mongoose";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;

    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is Required",
      });
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    const newRestaurant = await Restaurant.create({
      user: new mongoose.Types.ObjectId(req.id),
      restaurantName,
      city,
      country,
      deliveryTime,
      cuisines: JSON.parse(cuisines),
      imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Restaurant Added Successfully",
      restaurant: newRestaurant, // Return the created restaurant
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Restaurant Addition Failed",
    });
  }
};

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const restaurant = await Restaurant.findOne({
      user: new mongoose.Types.ObjectId(req.id),
    }).populate("menus");

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        restaurant: null,
        message: "Restaurant Not Found",
      });
    }

    

    return res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Restaurant Get Request Failed",
    });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;

    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const restaurant = await Restaurant.findOne({
      user: new mongoose.Types.ObjectId(req.id),
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant Not Found",
      });
    }

    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryTime = deliveryTime;
    restaurant.cuisines = JSON.parse(cuisines);

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File,
      );
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();

    return res.status(200).json({
      success: true,
      message: "Restaurant Details Updated Successfully",
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Restaurant Updation Failed",
    });
  }
};

export const getRestaurantOrders = async (req: Request, res: Response) => {
  try {
    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const restaurant = await Restaurant.findOne({
      user: new mongoose.Types.ObjectId(req.id),
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant Not Found",
      });
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Restaurant Order Search Request Failed",
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      success: true,
      status:order.status,
      message: "Order Status Updated Successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Order Status Updation Failed",
    });
  }
};

export const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const searchText = req.params.searchText || "";
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = ((req.query.selectedCuisines as string) || "")
      .split(",")
      .filter((cuisine) => cuisine);

    const andConditions: any[] = [];

    // searchText filter
    if (searchText) {
      andConditions.push({
        $or: [
          { restaurantName: { $regex: searchText, $options: "i" } },
          { city: { $regex: searchText, $options: "i" } },
          { country: { $regex: searchText, $options: "i" } },
        ],
      });
    }

    // searchQuery filter
    if (searchQuery) {
      andConditions.push({
        $or: [
          { restaurantName: { $regex: searchQuery, $options: "i" } },
          { cuisines: { $in: [new RegExp(searchQuery, "i")] } },
        ],
      });
    }

    // cuisine filter
    if (selectedCuisines.length > 0) {
      andConditions.push({
        cuisines: { $in: selectedCuisines },
      });
    }

    const query = andConditions.length > 0 ? { $and: andConditions } : {};

    const restaurants = await Restaurant.find(query);

    return res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Restaurant Searching Failed",
    });
  }
};

export const getSingleRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId).populate({
      path: "menus",
      options: { sort: { createdAt: -1 } }, // Fixed: sort syntax
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Restaurant Details Fetching Failed",
    });
  }
};
