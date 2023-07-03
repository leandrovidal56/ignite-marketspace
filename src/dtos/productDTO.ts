export type ProductDTO = { 
    name: string;
    description: string;
    is_new: boolean;
    price: string;
    image: string;
    accept_trade: boolean;
    payment_method: [
        string
    ]
}