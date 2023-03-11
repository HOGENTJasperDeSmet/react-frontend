import { Grid, Stack, Button, Container } from '@mui/material';
import { useShoppingCart } from '../../context/users/ShoppingCartContext';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import * as productsApi from '../../api/products';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ProductDetail() {
    const { increaseCartQuantity } = useShoppingCart();
    const location = useLocation();
    const [product, setProduct] = useState({});
    const [descriptionStyle, setDescriptionStyle] =
        useState('description-closed');

    const changeDescriptionStyle = () => {
        if (descriptionStyle === 'description-open') {
            setDescriptionStyle('description-closed');
        } else {
            setDescriptionStyle('description-open');
        }
    };

    const displayLessOrMoreButton = () => {
        if (descriptionStyle === 'description-open') {
            return (
                <Button
                    startIcon={<KeyboardArrowUpIcon />}
                    variant="text"
                    onClick={changeDescriptionStyle}
                    color="secondary"
                >
                    Toon minder
                </Button>
            );
        } else {
            return (
                <Button
                    startIcon={<KeyboardArrowDownIcon />}
                    variant="text"
                    onClick={changeDescriptionStyle}
                    color="secondary"
                >
                    Toon meer
                </Button>
            );
        }
    };

    const fetchProduct = useCallback(async () => {
        try {
            let productId = location.pathname.split('/').pop();
            let data = await productsApi.getProductById(productId);
            setProduct(data);
        } catch (error) {
            console.error(error);
        }
    }, [location]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return (
        <Container>
            <div className="product-detail-container">
                <Grid item lg={6} sx={{ flex: 1 }}>
                    <Stack spacing={2}>
                        <Typography variant="h4">{product.name}</Typography>
                        <Typography variant="h5">
                            € {product.price} | Aantal op vooraad:{' '}
                            {product.quantityInStock}
                        </Typography>
                        <p className={descriptionStyle}>
                            {product.description}
                        </p>
                        {displayLessOrMoreButton()}
                        <Button
                            fullWidth
                            color="primary"
                            variant="contained"
                            onClick={() =>
                                increaseCartQuantity(product.productId)
                            }
                        >
                            Bestel
                        </Button>
                    </Stack>
                </Grid>

                <Grid item lg={6}>
                    <img
                        className="product-detail-image"
                        src={product.picture}
                        alt="productImage"
                    />
                </Grid>
            </div>
        </Container>
    );
}
