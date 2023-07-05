export type ProductDTO = { 
    name: string;
    description: string;
    is_new: boolean;
    price: number;
    image: string[];
    accept_trade: boolean;
    payment_methods: string[];
    
}