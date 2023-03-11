import { useAuth0 } from '@auth0/auth0-react';
import { axios } from '.';
import { useCallback } from 'react';

const useOrders = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getAll = useCallback(async () => {
        const token = await getAccessTokenSilently();

        const { data } = await axios.get('/orders', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data.data;
    }, [getAccessTokenSilently]);

    return { getAll };
};

export default useOrders;
