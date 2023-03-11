import { axios } from '.';

export const findAll = async () => {
    const response = await axios.get('users');
    return response.data.data;
};

export const findCount = async () => {
    const data = await axios.get('users');
    return data;
};

export const findById = async (id) => {
    const { data } = await axios.get(`users/${id}`);
    return data;
};

export const findByEmail = async (email) => {
    const { data } = await axios.get(`users/find/${email}`);
    return data;
};

export const findFavorites = async (id) => {
    const { data } = await axios.get(`users/fav/${id}`);
    return data;
};

export const register = async ({ naam, email, password }) => {
    const { data } = await axios.post('users/register/', {
        naam,
        email,
        password,
    });
    return data;
};

export const login = async (email, password) => {
    const { data } = await axios.post('users/login', {
        email,
        password,
    });
    return data;
};

export const deleteById = async (id) => {
    await axios.delete(`users/${id}`);
};

export const updateById = async (id, { ...values } = {}) => {
    console.log('id??', id);
    console.log('values??', values);
    await axios({
        method: 'PUT',
        url: `users/${id ?? ''}`,
        data: values,
    });
};
