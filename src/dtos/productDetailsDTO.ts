export type ProductDetailsDTO = { 
    id?: string;
    name?: string;
    description?: string;
    price?: string;
    product_images?: string[];
    accept_trade?: boolean;
    is_new?: boolean;
    is_active?: boolean;
    payment_methods?: any[];
    user: {
        avatar: string;
        name: string;
        tel: string;
    }
    user_id?: string;
    
}
