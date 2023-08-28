import { IPhoto } from "../interfaces/IPhoto";
import { PaymentMethodsDTO } from '../dtos/PaymentMethodsDTO';
import { ProductImageDTO } from '../dtos/ProductImageDTO';
import { UserDTO } from '../dtos/userDTO';


export type ProductDTO = { 
    name: string;
    description: string;
    is_new: boolean;
    price: number;
    image: IPhoto[];
    accept_trade: boolean;
    id: string;
    user_id?: string;
    is_active?: boolean;
    payment_methods: PaymentMethodsDTO[];
    product_images: ProductImageDTO[];
    user: UserDTO;
    
}