import { Container, Stack } from '@mui/material';
import OrderList from '../components/orders/OrderList';

const Orders = () => {
    return (
        <Container>
            <Stack gap={3}>
                <OrderList />
            </Stack>
        </Container>
    );
};
export default Orders;
