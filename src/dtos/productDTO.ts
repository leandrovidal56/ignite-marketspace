import { IPhoto } from "../interfaces/IPhoto";

export type ProductDTO = { 
    name: string;
    description: string;
    is_new: boolean;
    price: number;
    image: IPhoto[];
    accept_trade: boolean;
    payment_methods: string[];
    
}