import { axios } from '.';

export const getAll = async () => {
    const response = await axios.get('products');
    return response.data.data;
};

export const getProductById = async (productId) => {
    const { data } = await axios.get(`products/${productId}`);
    return data;
};

export const update = async (productId, { ...values } = {}) => {
    console.log('productId??', productId);
    console.log('values??', values);
    await axios({
        method: 'PUT',
        url: `products/${productId ?? ''}`,
        data: values,
    });
};
