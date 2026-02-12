import mongoose, { Document } from "mongoose";

export interface IMenu {
    name: string;
    description: string;
    price: number; 
    image: string;
}

export interface IMenuDocument extends IMenu, Document {
    _id: mongoose.Types.ObjectId; 
    createdAt: Date;
    updatedAt: Date; 
}

const menuSchema = new mongoose.Schema<IMenuDocument>({
    // REMOVED _id field - MongoDB creates this automatically
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Menu = mongoose.model<IMenuDocument>("Menu", menuSchema);