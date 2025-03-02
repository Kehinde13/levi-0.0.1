import mongoose from 'mongoose';

export enum UserRole {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
    VENDOR = 'vendor'
}

interface ICartItem {
    productId: string;
    quantity: number;
}

export interface IUser extends Document {
    _id: string;    
    name: string;
    email: string;
    password: string;
    role: UserRole;
    isApproved?: boolean;
    cart: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IProduct extends Document {
    _id: string;    
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image: string;
    vendor: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApiProductResponse {   
    totalProducts: number;
    totalPages: number;
    currentPage: number;
    products: IProduct[];
  }

export type ErrorResponse = {
    response?: {
      data?: {
        message?: string;
      };
    };
  };
  
  