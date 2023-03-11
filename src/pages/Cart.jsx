import { useState } from 'react';
import { Stack } from '@mui/system';
import CartItem from '../components/shoppingCart/CartItem';
import { Button, Container, Divider } from '@mui/material';
import { useShoppingCart } from '../context/users/ShoppingCartContext';
import * as productsApi from '../api/products';
import PriceTotal from '../components/shoppingCart/PriceTotal';
import { useEffect } from 'react';

const Cart = () => {
    const { cartItems } = useShoppingCart();
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);

    const CalculateTotalPrice = (cartItems) => {
        const total = cartItems.reduce((total, cartItem) => {
            const item = products?.find(
                (p) => p.productId === cartItem.productId
            );
            return total + (item?.price || 0) * cartItem.quantity;
        }, 0);

        return total.toFixed(2);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await Promise.all(
                    cartItems.map((i) =>
                        productsApi.getProductById(i.productId)
                    )
                );
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        // eslint-disable-next-line
    }, []);

    if (cartItems.length === 0)
        return (
            <Container>
                <h1 style={{ marginBottom: '1rem' }}>Je winkelwagen is leeg</h1>
                <Button variant="contained" href="/products">
                    Ga naar producten
                </Button>
            </Container>
        );

    if (loading) {
        return null;
    }

    return (
        <Container>
            <div className="title-checkout-button">
                <h1>Jouw winkelwagen</h1>
                <Button variant="contained" color="primary">
                    Ga naar bestellen
                </Button>
            </div>
            <Divider sx={{ marginBottom: '24px' }} />
            <Stack spacing={3}>
                {cartItems.map((item) => (
                    <CartItem
                        key={item.productId}
                        item={products.find(
                            (p) => p.productId === item.productId
                        )}
                        quantity={item.quantity}
                    />
                ))}
            </Stack>
            <Stack direction="row" justifyContent="flex-end" mt="24px">
                <PriceTotal totalPrice={CalculateTotalPrice(cartItems)} />
            </Stack>
        </Container>
    );
};

export default Cart;
