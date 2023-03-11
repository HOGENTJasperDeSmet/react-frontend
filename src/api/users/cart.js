import { CART } from '../mockdata/shoppingCart/mock-data.js';

export const getCart = async () => {
    const { data } = CART;

    return data;
};
