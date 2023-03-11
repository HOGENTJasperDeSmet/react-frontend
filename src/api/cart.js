import { axios } from '.';

export const getCart = async () => {
    const response = await axios.get('cart');
    return response.data.data;
};
